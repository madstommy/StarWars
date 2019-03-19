import React, { Component } from 'react';
import Card from './Card';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Card type='bean' url='https://swapi.co/api/starships/41/' />
      </div>
    );
  }
}

export default App;
