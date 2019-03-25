import React, { Component } from "react";
import "./Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false
    };

    try{
      this.fetchInfo(this.props.url);
    } catch (err){
      console.log(err);
    }
  }

  getName = async url => {
    const data = await fetch(url);
    const info = await data.json();
    if (info.name === undefined) {
      return info.title;
    } else {
      return info.name;
    }
  };

  getNames = async elements => {
    const realNames = [];
    for (let ele of elements) {
      let e = await this.getName(ele);
      realNames.push(e);
    }
    return realNames;
  };

  fetchInfo = async currentUrl => {
    if(this.state.isMounted){
      this.setState({isMounted:false});
    }
    const data = await fetch(currentUrl);
    const info = await data.json();
    const entries = Object.entries(info);
    for (const [prop, ent] of entries) {
      if (!Array.isArray(ent)) {
        this.setState({ [`${this.modifyString(prop)}`]: ent });
      } else {
        const names = await this.getNames(ent);
        this.setState({ [`${this.modifyString(prop)}`]: names });
      }
    }
    this.setState({isMounted:true});
  };

  componentWillUpdate(prevProps){
    if(prevProps.url !== this.props.url){
      this.fetchInfo(prevProps.url);
    }
  }

  modifyString = st => {
    st = st.charAt(0).toUpperCase() + st.slice(1);
    st = st.replace(/_/g, " ");
    return st;
  };

  render() {
    const entries = Object.entries(this.state);
    const filtEntries = entries.filter(
      ([prop, ent]) =>
        !(
          prop.toLowerCase().includes("url") ||
          prop.toLowerCase().includes("created") ||
          prop.toLowerCase().includes("edited") ||
          prop.toLowerCase().includes("homeworld") ||
          prop.toLowerCase().includes("ismounted")
        )
    );
    const cardComponent = [];
    let i = 0;
    for (const [prop, ent] of filtEntries) {
      if (!Array.isArray(ent)) {
        cardComponent.push(
          <li key={i++}>
            {prop}: {ent}
          </li>
        );
        i++;
      } else if(ent.length>0){
        let miniList = [];
        miniList = ent.map(ele => <li key={i++}>{ele}</li>);
        i++;
        cardComponent.push(
          <ul key={i++}>
            <li key={i++}>
              <span className="listBegin">{prop}</span>
              <ul>{miniList}</ul>
            </li>
          </ul>
        );
      }
    }
    return (this.state.isMounted ? 
       (
        <div className="mainCard">
          <ul>{cardComponent}</ul>
        </div>
      )
      :
      (
        <div className="mainCard">
          <h1>Loading! <FontAwesomeIcon icon={faSpinner} spin /></h1>
        </div>
      )
    )}
}

export default Card;
