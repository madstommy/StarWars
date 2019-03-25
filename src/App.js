import React, { Component } from 'react';
import AllResults from './AllResults/AllResults';
import SearchBox from './SearchBox/SearchBox';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: 'Luke',
      searchTerm:'Luke'
    }
  }
  onSearchClick = () =>{
    this.setState({searchTerm:this.state.input});
  }

  onSearchChange = event => {
    this.setState({input:event.target.value});
  }
  render() {
    return (
      <div className="App">
        <SearchBox onSearchChange={this.onSearchChange} onSearchClick={this.onSearchClick} />
        <AllResults searchTerm={this.state.searchTerm}/>
      </div>
    );
  }
}

export default App;
