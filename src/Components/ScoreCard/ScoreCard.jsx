import React, { Component } from "react";
import "./ScoreCard.css";

class ScoreCard extends Component {
  render() {
    const { highestScore, diamondsLeft, currentScore } = this.props;
    return (
      <React.Fragment>
        <aside className="score-board">
          <article className="title">Score Board</article>
          <article className="info">Your Highest Score : {highestScore} </article>
          <article className="info">Diamonds yet to be found : {diamondsLeft} </article>
          <article className="info">Your Current Score : {currentScore}</article>
        </aside>
      </React.Fragment>
    );
  }
}

export default ScoreCard;
