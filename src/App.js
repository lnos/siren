import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var recognition = new window.webkitSpeechRecognition()
recognition.continous = true
recognition.interimResults = true
recognition.lang = 'en-US'

class App extends Component {

  constructor() {
    super()
    this.state = {
      listening: false,
      recipeCard: null
    }
    this.toggleListen = this.toggleListen.bind(this)
    this.handleListen = this.handleListen.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(){
    this.setState({
      recipeCard: 'americano'
    }, console.log("updated!"))
  }

  toggleListen() {
    this.setState({
      listening: !this.state.listening
    }, this.handleListen)
  }
  
  handleListen(){
    if (this.state.listening) {
      recognition.start()
      recognition.onend = () => {
        console.log("...continue listening...")
        recognition.start()
      }

    } else {
      recognition.stop()
      recognition.onend = () => {
        console.log("Stopped listening per click")
      }
    }

    recognition.onstart = () => {
      console.log("Listening!")
    }

    let finalTranscript = ''
    recognition.onresult = event => {
      let interimTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript + ' ';
        else interimTranscript += transcript;
      }
      document.getElementById('interim').innerHTML = interimTranscript
      document.getElementById('final').innerHTML = finalTranscript

      if(interimTranscript.includes('Americano')){
        this.setState({recipeCard: 'https://m1.behance.net/rendition/modules/128776933/disp/2d6c3ccfb3a5e7b7effed4631dc2d2c6.jpg'})
      }
    }

    recognition.onerror = event => {
      console.log("Error occurred in recognition: " + event.error)
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Siren</h1>
        </header>
        <div className="info-container">
          <button id='microphone-btn' onClick={this.toggleListen}>start</button>
          <p>Transcript:</p>
          <input id='test-text' type="text" name="lname"></input>
          <button id='test-input' onClick={this.handleInput}>test</button>
          <div id='interim'></div>
          <div id='final'></div>
          <img src={this.state.recipeCard} className="recipeCard" alt="recipeCard"/>
        </div>
      </div>
    );
  }
}

export default App;