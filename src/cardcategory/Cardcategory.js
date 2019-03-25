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
    const url = `https://swapi.co/api/${this.props.type}/?search=${this.props.searchTerm}`;
    this.createList(url)
  }


  createList = async linker => {
    const data = await fetch(linker);
    const info = await data.json()
    const urlList = info.results.map(element => element.url);
    this.setState({urlList});
  }

  componentDidUpdate(prevProps){
    if(this.props.searchTerm !== prevProps.searchTerm){
      const url = `https://swapi.co/api/${this.props.type}/?search=${this.props.searchTerm}`;
      this.createList(url);
    }
  }

  render() {
    const { urlList, type } = this.state;
    let i=0;
    const componentList = urlList.map( ele => 
      <Card key={i++} type = {type}
            url = {ele} / >
    )
    if(componentList.length >0) {return (
            <div>
              <h1>{type}</h1>
              <div className="containerBox">
                {componentList}
              </div>
            </div>
             );
    } else{
      return (
        <div>
          <h1>{type}</h1>
          <h2>Nothing to Display</h2>
        </div>
      );
    }
   
  }
}

export default Cardcategory;