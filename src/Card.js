import React, { Component } from 'react';
import './Card.css'

class Card extends Component{
    constructor(props){
        super(props);
        console.log(this.props);
        this.state = {
            url: this.props.url,
        }
        
    }

    componentDidMount(){
        const getName = async (url) => {
            const data = await fetch(url);
            const info = await data.json();
            if(info.name === undefined){
                return info.title;
            }
            else{
                return info.name;
            }
       } 

       const getNames = async elements => {
            const realNames = await elements.map( async e => await getName(e));
            return realNames;
       }
        
        const fetchInfo = async () => {
            const data = await fetch(this.props.url);
            const info = await data.json();
            const entries = Object.entries(info);
            for(const [prop, ent] of entries){
                if(!Array.isArray(ent)){
                    this.setState({[`${prop}`]: ent});
                } else {
                    const names = await getNames(ent);
                    this.setState({[`${prop}`]: names});
                }
            }
        }

        
        fetchInfo();
    }

  

    render(){

        const entries = Object.entries(this.state);
        const filtEntries = entries.filter(([prop,ent]) => !(prop.includes('url') || prop.includes('created') || prop.includes('edited')));
        const cardComponent = [];
        for( const [prop, ent] of filtEntries){
            if(!Array.isArray(ent)){
                cardComponent.push( 
                <li>{prop}: {ent}</li>
                )
            }
            else{
                let miniList=[];
                for(const element of ent){
                    element.then(e => {
                        miniList.push(<li>{e}</li>);
                    });
                }

                console.log(miniList);
                console.log(cardComponent);
                cardComponent.push(
                <li>{prop}:<div>{miniList}</div></li>
                );
            }
        }

        return(
        <div className="mainCard">
            <ul>{cardComponent}</ul>
        </div>
        );
    }
}

export default Card;