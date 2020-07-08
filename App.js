import React, { Component } from 'react'

import './App.css';
import Game from './Game';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      gameCanStart: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitWord = this.submitWord.bind(this);
  }

  handleChange(event) {
    const value = event.target.value
    this.setState({word: value});
  }

  submitWord(event) {
    const word = this.state.word
    const regex = /^([a-z]+)$/;
    if(!regex.test(word)){
      this.setState({word: ""});
      alert("Veuillez entrer un mot valide.")
    }else{
      this.setState({gameCanStart: true});
    }
    event.preventDefault();
  }

  render() {
    const {gameCanStart, word} = this.state
    if(gameCanStart) {
      return (
        <Game word={word} />
      );
    } else {
      return (
        <form onSubmit={this.submitWord}>
        <input type="text" value={this.state.word} onChange={this.handleChange} />
        <input type="submit" value="Envoyer" />
        </form>
      );
    }
  }
}

export default App;
