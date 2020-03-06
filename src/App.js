import React, { Component } from 'react';
import Board from "./Components/Board/Board";
import './App.css';

class App extends Component {
   render() {
     return(
       <React.Fragment>
          <header className="header">
            <h3>The goal of this exercise is to build a Diamond Sweeper game...!</h3>
          </header>
          <Board/>
       </React.Fragment>
     )
   }
}

export default App;
