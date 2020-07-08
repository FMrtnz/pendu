import React, { Component } from 'react'

import Letter from './Letter';

const VISUAL_PAUSE_MSECS = 250

class Game extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      lettersToFind: props.word.toUpperCase().split(''),
      lettersGuessed: [],
      triesCount : 7,
      gameOverIs: false
    }
  }

  addLetter(letter){
    letter = letter.toUpperCase()
    const { lettersGuessed } = this.state
    const present = lettersGuessed.includes(letter)
    if(letter.length < 2 && letter.match(/[A-Z]/i) && !present){
      this.setState(previousState => ({ lettersGuessed: [...lettersGuessed,letter] }))
      this.updateTries(letter)
    } else if (present) {
      alert(letter + " a déjà été entrée.")
    }
    this.gameIsOver()
  }

  gameIsOver() {
    if(this.state.triesCount === 0 || this.allLettersFound()){
      this.setState( {gameOverIs: true} )
      window.removeEventListener('keydown', this.keyboardInput);
      setTimeout(() => this.gameConclusion(), VISUAL_PAUSE_MSECS)
    }
  }

  updateTries(letter){
    const { lettersToFind, triesCount } = this.state
    const matched = lettersToFind.includes(letter)
    if(!matched){
      this.setState({triesCount: triesCount - 1})
    }
  }

  allLettersFound(){
    const { lettersToFind, lettersGuessed } = this.state
    for (const [letter] of lettersToFind) {
      const inside = lettersGuessed.includes(letter)
      if( !inside ) {
        return false
      }
    }
    return true
  }

  keyboardInput = (e) => {
    this.addLetter(e.key)
  };

  gameConclusion(){
    const {triesCount} = this.state
    const cl = triesCount > 0 ? "BRAVO ! Vous avez trouvé le mot !" : "PERDU ! Vous avez été pendu !"
    alert("Le jeu est fini : " + cl)
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keyboardInput);
  }

  showLetter(letter) {
    const { lettersGuessed } = this.state
    const matched = lettersGuessed.includes(letter)
    return matched ? 'visible' : 'hidden'
  }

  render() {
    const {lettersToFind} = this.state;
    return (
      <div className="App">
        {lettersToFind.map((letter, i) => (
          <Letter letter={letter} key={i} feedback={this.showLetter(letter)}/>
        ))}
        <p>{this.state.lettersGuessed.map((letter, i) => (<span key={i}>{letter},</span>))}</p>
        <p>Essaies: {this.state.triesCount}</p>
        <button onClick={() => window.location.reload(false)}>RELANCER LA PARTIE</button>
      </div>
    );
  }
}

export default Game;
