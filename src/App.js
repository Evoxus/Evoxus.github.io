import React, { Component } from "react";
import "./App.css";
import quotes from './quotes';

class QuoteBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: quotes
    }
    this.randomNumber = this.randomNumber.bind(this);
  }

  // generates a random number between 0 and 102 (there are 102 different quotes to pick from)
  randomNumber() {
    return Math.round(Math.random() * 102)
  }

  render() {
    const newQuote = this.randomNumber();
    return (
      <div id='quote-box'>
        <h2 id='text'>{quotes[newQuote].quote}</h2>
        <p id='author'>{quotes[newQuote].author}</p>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <QuoteBox />
    );
  }
}

export default App;