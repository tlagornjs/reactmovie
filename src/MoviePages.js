import React, { Component } from "react";
import "./MoviePages.css";

// const __pageBlock = 1;
// const __nextPage = 1;

// let __movie_count = 1;
// let __page_number = 1;
//let __page_block = 20;

class MoviePages extends Component {
  state = {};

  movieData = this.props.movieDataObject;
  __movie_count = this.props.movieDataObject.movie_count;
  __page_number = this.props.movieDataObject.page_number;
  __page_block = this.props.movieDataObject.page_block;

  __callParentFunctionMovePages = e => {
    // console.log("MoviePages.__nextPage=", this.__nextPage);
    // console.log("MoviePages.__movie_count=", this.__movie_count);
    // console.log("MoviePages.__page_block=", this.__page_block);
    // console.log(
    //   "Total page=",
    //   Math.ceil(
    //     this.props.movieDataObject.__movie_count /
    //       this.props.movieDataObject.__page_block
    //   )
    // );
    this.props.handleToAppPages({
      nextPage: this.__nextPage
    });
  };

  __callParentFunctionFirst = e => {
    e.preventDefault();
    if (this.props.movieDataObject.page_number > 1) {
      this.__nextPage = 1;
      this.__callParentFunctionMovePages();
    } else {
      alert("First page!");
      return false;
    }
  };
  __callParentFunctionPrev = e => {
    e.preventDefault();
    if (this.props.movieDataObject.page_number > 1) {
      this.__nextPage = this.props.movieDataObject.page_number - 1;
      this.__callParentFunctionMovePages();
    } else {
      alert("First page!");
      return false;
    }
  };

  __callParentFunctionNext = e => {
    e.preventDefault();
    if (
      Math.ceil(
        this.props.movieDataObject.movie_count /
          this.props.movieDataObject.page_block
      ) > this.props.movieDataObject.page_number
    ) {
      this.__nextPage = this.props.movieDataObject.page_number + 1;
      this.__callParentFunctionMovePages();
    } else {
      alert("Final page!");
      return false;
    }
  };

  __callParentFunctionFinal = e => {
    e.preventDefault();
    if (
      Math.ceil(
        this.props.movieDataObject.movie_count /
          this.props.movieDataObject.page_block
      ) > this.props.movieDataObject.page_number
    ) {
      this.__nextPage = Math.ceil(
        this.props.movieDataObject.movie_count /
          this.props.movieDataObject.page_block
      );
      this.__callParentFunctionMovePages();
    } else {
      alert("Final page!");
      return false;
    }
  };

  render() {
    console.log(
      "MoviePages.__movie_count=",
      this.props.movieDataObject.movie_count
    );
    console.log(
      "MoviePages.__page_number=",
      this.props.movieDataObject.page_number
    );
    console.log(
      "MoviePages.__page_block=",
      this.props.movieDataObject.page_block
    );
    console.log(
      "Total page=",
      Math.ceil(
        this.props.movieDataObject.movie_count /
          this.props.movieDataObject.page_block
      )
    );

    return (
      <div className="MoviePages">
        <div className="MoveiPagesDiv">
          <button onClick={this.__callParentFunctionFirst} id="pageFirst">
            First
          </button>
        </div>
        <div className="MoveiPagesDiv">
          <button onClick={this.__callParentFunctionPrev} id="pagePrev">
            Prev
          </button>
        </div>
        <div className="MoveiPagesDiv"> {this.props.movieDataObject.page_number} </div>
        <div className="MoveiPagesDiv">
          <button onClick={this.__callParentFunctionNext} id="pageNext">
            Next
          </button>
        </div>
        <div className="MoveiPagesDiv">
          <button onClick={this.__callParentFunctionFinal} id="pageFinal">
            Final
          </button>
        </div>
      </div>
    );
  }
}

export default MoviePages;
