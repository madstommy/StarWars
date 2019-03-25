import React, { Component } from 'react';

class SearchBox extends Component {
  render() {
    const { onSearchChange , onSearchClick} = this.props;
    return (
      <div>
          <label  htmlFor="search">Search:  </label>
          <input onChange={onSearchChange} type="text" name="search" id="search"></input>
          <button onClick={onSearchClick} >Search</button>
      </div>
    );
  }
}

export default SearchBox;