import React, { Component } from "react";
import "./ScoreCard.css";

class ScoreCard extends Component {
  render() {
    const { highestScore, diamondsLeft, currentScore } = this.props;
    return (
      <React.Fragment>
        <section className="score-board">
          <section className="title">Score Board</section>
          <section className="info">Your Highest Score : {highestScore} </section>
          <section className="info">Diamonds yet to be found : {diamondsLeft} </section>
          <section className="info">Your Current Score : {currentScore}</section>
        </section>
      </React.Fragment>
    );
  }
}

export default ScoreCard;
