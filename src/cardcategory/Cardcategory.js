import React, { Component } from 'react';
import Card from '../Card';
import './CardCategory.css';

class Cardcategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.searchTerm,
      type: this.props.type,
      urlList: []
    };
  }

  componentDidMount() {
    const url = `https://swapi.co/api/${this.state.type}/?search=${this.state.searchTerm}`;

    const createList = async linker => {
      const data = await fetch(linker);
      const info = await data.json()
      const urlList = info.results.map(element => element.url);
      console.log(urlList);
      this.setState({urlList});
    }

    createList(url);
  }

  render() {
    const { urlList, type } = this.state;
    const componentList = urlList.map( ele => 
      <Card type = {type}
            url = {ele} / >
    )
    return ( <div>
                <h1>{type}</h1>
              <div className="containerBox">
                {componentList}
              </div>
            </div>
    );
  }
}

export default Cardcategory;