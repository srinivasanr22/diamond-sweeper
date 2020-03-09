import React, { Component } from "react";
import "./ScoreCard.css";

class ScoreCard extends Component {
  render() {
    const { highestScore, diamondsLeft, currentScore } = this.props;
    return (
      <React.Fragment>
        <div className="score-board">
          <div className="title">Score Board</div>
          <div className="info">Your Highest Score : {highestScore} </div>
          <div className="info">Diamonds yet to be found : {diamondsLeft} </div>
          <div className="info">Your Current Score : {currentScore}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default ScoreCard;
