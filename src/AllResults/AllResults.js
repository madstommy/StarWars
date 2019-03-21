import React, { Component } from 'react';
import Cardcategory from '../cardcategory/Cardcategory';
import './AllResults.css';

class AllResults extends Component {
  render() {
    return (
      <div className="gridOfResults">
        <Cardcategory searchTerm = 'a' type = 'people'/>
        <Cardcategory searchTerm = 'a' type = 'planets'/>
      </div>
    );
  }
}

export default AllResults;