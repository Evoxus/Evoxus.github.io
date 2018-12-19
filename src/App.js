import React, { Component } from "react";
import "./App.css";
import quotes from './quotes';

class QuoteBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: quotes,
      currentQuote: Math.round(Math.random() * 102)
    }
    this.randomNumber = this.randomNumber.bind(this);
  }

  // generates a random number between 0 and 102 (there are 102 different quotes to pick from)
  randomNumber() {
    this.setState({
      currentQuote: Math.round(Math.random() * 102)
    })
  }

  render() {

    return (
      <div id='quote-box' className="container">
        <QuoteText value={this.state} />
        <QuoteAuthor value={this.state} />
        <button id="new-quote" className="btn btn-primary" onClick={this.randomNumber}>New Quote</button>
      </div>
    );
  }
}

function QuoteText(props) {
  return <h2 id="text">{props.value.quotes[props.value.currentQuote].quote}</h2>;
}

function QuoteAuthor(props) {
  return <p id='author'>{props.value.quotes[props.value.currentQuote].author}</p>;
}

class App extends Component {
  render() {
    return (
      <QuoteBox />
    );
  }
}

export default App;