import React, {
  Component
} from "react";
import "./App.css";
import quotes from './quotes';

class QuoteBox extends Component {
  render() {
    const newQuote = randomNumber();
    console.log(newQuote);
    return <div>
      <p>{quotes[newQuote].quote}
        <caption>{quotes[newQuote].author}</caption>
      </p>
    </div>
  }
}

class App extends Component {
  render() {
    return <QuoteBox />;
  }
}

function randomNumber() {
  return Math.round(Math.random() * 102)
}

export default App;