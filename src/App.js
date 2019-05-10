import React, { Component } from "react";
import MovieHeader from "./MovieHeader";
import MoviePages from "./MoviePages";
import Movie from "./Movie";
import "./App.css";

class App extends Component {
  state = {};

  _sortby = "rating";
  _orderby = "desc"; // desc, asc
  _currentPage = 1;
  _queryTerm = "";
  _nextPage = 1;
  _pageBlock = 1;
  _listLimit = 20;

  componentDidMount() {
    console.log("componentDidMount");
    this._getMovieList();
  }

  _callMovieListGoPagesFromChild = parVal => {
    console.log("parVal:" + parVal);

    let parNextPage = parVal.nextPage;
    this._nextPage = parNextPage;
    this._getMovieList();
  };
  _callMovieListFromChild = parVal => {
    console.log("parVal:" + parVal);

    let parSortBy = parVal.sortby;
    let parOrderBy = parVal.orderby;
    let parQueryTerm = parVal.queryTerm;
    // let parNextPage = parVal.nextPage;

    if (parVal.sortby == null) {
      parSortBy = this._sortby;
    }
    if (parVal.orderby == null) {
      parOrderBy = this._orderby;
    }
    if (parVal.queryTerm == null) {
      parQueryTerm = this._queryTerm;
    }
    // if (parVal.nextPage == null) {
    //   parNextPage = this._nextPage;
    // }

    this._sortby = parSortBy;
    this._orderby = parOrderBy;
    this._queryTerm = parQueryTerm;
    this._nextPage = 1;
    this._getMovieList();
  };

  _getMovieList = async () => {
    const moviesFromApi = await this._callApi();
    this.setState({
      movieData: moviesFromApi
    });
  };

  _callApi = () => {
    console.log("_callApi.this._orderby:" + this._orderby);
    console.log("_callApi.this._sortby:" + this._sortby);
    console.log("_callApi.this._queryTerm:" + this._queryTerm);
    console.log("_callApi.this._nextPage:" + this._nextPage);
    console.log("_callApi.this._listLimit:" + this._listLimit);
    return fetch(
      "https://yts.am/api/v2/list_movies.json?order_by=" +
        this._orderby +
        "&sort_by=" +
        this._sortby +
        "&query_term=" +
        this._queryTerm +
        "&page=" +
        this._nextPage +
        "&limit=" +
        this._listLimit
    )
      .then(ret => ret.json())
      .then(json => json.data) // json.data.movies
      .catch(err => console.log(err));
  };

  _renderMovies = () => {
    const movies = this.state.movieData.movies.map(movie => {
      let movieObject = {
        movieTitle: movie.title_long,
        movieImage: movie.large_cover_image,
        movieGenres: movie.genres,
        movieSynopsis: movie.synopsis,
        movieRating: movie.rating,
        movieYear: movie.year
      };
      return (
        <Movie
          key={movie.id}
          movieObject={movieObject}
          /*
            movieTitle={movie.title_english}
            movieImage={movie.big_cover_image}
            movieGenres={movie.genres}
            movieSynopisi={movie.synopsis}
            movieRating={movie.rating}
            movieYear={movie.year}
            */
        />
      );
    });
    return movies;
  };

  _renderMoviePages = () => {
    const movieDataObject = {
      movie_count: this.state.movieData.movie_count,
      page_number: this.state.movieData.page_number,
      page_block: this._listLimit
    };
    console.log("movie_count:" + movieDataObject.movie_count);
    console.log("page_number:" + movieDataObject.page_number);
    return (
      <MoviePages
        movieDataObject={movieDataObject}
        handleToAppPages={this._callMovieListGoPagesFromChild}
      />
    );

    //return moviePages;
  };

  render() {
    return (
      <div className={this.state.movieData ? "App" : "AppLoading"}>
        {this.state.movieData ? (
          <MovieHeader
            sortby={this._sortby}
            orderby={this._orderby}
            queryTerm={this._queryTerm}
            handleToApp={this._callMovieListFromChild}
          />
        ) : (
          ""
        )}
        {this.state.movieData ? this._renderMoviePages() : "Loading"}
        {this.state.movieData ? this._renderMovies() : "Loading"}
      </div>
    );
  }
}

export default App;
