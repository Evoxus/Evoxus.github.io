import React, { Component } from "react";
import { render } from "react-snapshot";
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
        <div className="button-box">
          <button id="new-quote" className="btn btn-primary" onClick={this.randomNumber}>Hit me with another</button>
          <TweetQuote value={this.state} />
        </div>
      </div>
    );
  }
}

function QuoteText(props) {
  return <h2 id="text">"{props.value.quotes[props.value.currentQuote].quote}"</h2>;
}

function QuoteAuthor(props) {
  return <p id='author'> - {props.value.quotes[props.value.currentQuote].author}</p>;
}

function TweetQuote(props) {
  const tweet = `https://twitter.com/intent/tweet?text=${props.value.quotes[props.value.currentQuote].quote}--${props.value.quotes[props.value.currentQuote].author}`
  return <a id="tweet-quote" href={tweet} >
    <i className="fab fa-twitter-square fa-3x"></i>
  </a>;
}

class App extends Component {
  render() {
    return (
      <QuoteBox />
    );
  }
}

export default App;