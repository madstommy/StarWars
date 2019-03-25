import React, { Component } from 'react';
import Cardcategory from '../cardcategory/Cardcategory';
import './AllResults.css';

class AllResults extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchTerm:props.searchTerm
    }
  }
  render() {
    return (
      <div className="gridOfResults">
        <Cardcategory searchTerm = {this.props.searchTerm} type = 'people'/>
        <Cardcategory searchTerm = {this.props.searchTerm} type = 'planets'/>
        <Cardcategory searchTerm = {this.props.searchTerm} type = 'species'/>
        <Cardcategory searchTerm = {this.props.searchTerm} type = 'starships'/>
        <Cardcategory searchTerm = {this.props.searchTerm} type = 'films'/>
        <Cardcategory searchTerm = {this.props.searchTerm} type = 'vehicles'/>
      </div>
    );
  }
}

export default AllResults;