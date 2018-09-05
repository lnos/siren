import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentDidmount(){
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Siren</h1>
        </header>
        <div className="info-container">
          
        </div>
      </div>
    );
  }
}

export default App;