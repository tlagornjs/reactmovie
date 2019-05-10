import React, { Component } from "react";
import "./MovieHeader.css";

const sortByArr = [
  { val: "title", text: "Title" },
  { val: "year", text: "Year" },
  { val: "rating", text: "Rating" }
];

const orderByArr = [{ val: "asc", text: "▲" }, { val: "desc", text: "▼" }];

class MovieHeader extends Component {
  state = {};

  __sortby = this.props.sortby;
  __orderby = this.props.orderby;
  __queryTerm = this.props.queryTerm;

  __handleChange = e => {
    this.__sortby = e.target.value;
  };
  __handleChange2 = e => {
    this.__orderby = e.target.value;
  };
  __handleChange3 = e => {
    this.__queryTerm = e.target.value;
  };

  __callParentFunction = e => {
    console.log("this.__sortby:" + this.__sortby);
    console.log("this.__orderby:" + this.__orderby);
    console.log("this.__queryTerm:" + this.__queryTerm);
    this.props.handleToApp({
      sortby: this.__sortby,
      orderby: this.__orderby,
      queryTerm: this.__queryTerm
    });
  };

  render() {
    console.log("MovieHeader", this.props);
    return (
      <div className="MovieHeader">
        <b>Movie List</b>
        <div>
          SEARCH
          <input
            type="text"
            id="queryTerm"
            name="queryTerm"
            onChange={this.__handleChange3}
          />
        </div>
        <div>
          <select
            className="MovieSortSelect"
            onChange={this.__handleChange}
            id="sortby"
            name="sortby"
            defaultValue={this.__sortby}
          >
            {sortByArr.map(eachArr => (
              <option value={eachArr.val} key={eachArr.val}>
                {eachArr.text}
              </option>
            ))}
          </select>
          <select
            className="MovieOrderSelect"
            onChange={this.__handleChange2}
            id="orderby"
            name="orderby"
            defaultValue={this.__orderby}
          >
            {orderByArr.map(eachArr => (
              <option value={eachArr.val} key={eachArr.val}>
                {eachArr.text}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button name="btnGo" onClick={this.__callParentFunction}>
            GET LIST
          </button>
        </div>
        <div />
      </div>
    );
  }
}

export default MovieHeader;
