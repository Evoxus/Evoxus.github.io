import React, { Component } from "react";
import "./App.css";

// let quotes = (function() {
//   let quotes = null;
//   $.ajax({
//     async: false,
//     global: false,
//     url: "quotes.json",
//     dataType: "json",
//     success: function(data) {
//       quotes = data;
//     }
//   });
//   return quotes;
// })();

// console.log(quotes);

class QuoteBox extends Component {
  render() {
    return <p> Testing </p>;
  }
}

class App extends Component {
  render() {
    return <QuoteBox />;
  }
}

export default App;
