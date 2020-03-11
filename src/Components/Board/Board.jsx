import React, { Component } from "react";
import Cell from "../Cell/Cell";
import ScoreCard from "../ScoreCard/ScoreCard";
import { DIAMOND, ARROW } from "../../assets/images/index";
import "./Board.css";

class Board extends Component {
  constructor(props) {
    super(props);
    // state initialization.
    this.state = {
      nbrOfRows: 8,
      nbrOfCol: 8,
      diamondPosition: [],
      diamondsLeft: 0,
      currentScore: 0,
      showArrow: false,
      highestScore: 0,
      iconList: []
    };
  }

  /***
   * leverage life cycle hook.
   */
  componentDidMount = () => {
    this.generateRandomPosition();
    this.setInitialValue();
  };

  /**
   * Set initial value to start game.
   */
  setInitialValue = () => {
    const { nbrOfCol, nbrOfRows } = this.state;
    let { highestScore } = this.state;
    const diamondsLeft = nbrOfCol;
    const currentScore = nbrOfRows * nbrOfCol;
    highestScore = localStorage.getItem("highestScore") || 0;
    this.setState({ diamondsLeft, currentScore, highestScore });
  };

  /***
   *  Generate Random Position to place diamond icon.
   */
  generateRandomPosition = () => {
    const { nbrOfRows, nbrOfCol } = this.state;
    const diamondPosition = [];
    [...Array(nbrOfRows)].forEach(() =>
      diamondPosition.push(Math.floor(Math.random() * (nbrOfCol - 1)) + 1)
    );
    this.setState({ diamondPosition });
    this.generateIconList(nbrOfRows, nbrOfCol, diamondPosition);
  };

  /***
   * Generate Icon to be shown when user interact on the game.
   */
  generateIconList = (rows, cols, diamondPosition) => {
    const iconList = [];
    for (let i = 0; i < rows; i++) {
      const icon = [];
      for (let j = 0; j < cols; j++) {
        const data = {
          src: j === diamondPosition[i] ? DIAMOND : ARROW,
          showIcon: false,
          alt: j === diamondPosition[i] ? "DIAMOND" : "ARROW",
          isDiamond: j === diamondPosition[i]
        };
        icon.push(data);
      }
      iconList.push(icon);
    }
    this.setState({ iconList });
  };

  /***
   *  Calculate number of diamond left in the game
   *  & current score
   */
  countScore = data => {
    let { diamondsLeft } = this.state;
    if (data.isDiamond) {
      diamondsLeft--;
    }
    // currentScore
    let currentScore = this.state.currentScore;
    currentScore--;
    this.setState({ diamondsLeft, currentScore });
    this.updateArrowDirection(data);
    this.updateIconVisibility(data);
    if (!diamondsLeft) {
      this.updateHighestScore(currentScore);
    }
  };

  /***
   * Used to update the visibility of icon.
   */
  updateIconVisibility = data => {
    const { iconList } = this.state;
    for (let i = 0; i < iconList.length; i++) {
      for (let j = 0; j < iconList[i].length; j++) {
        if (!iconList[i][j].isDiamond) {
          iconList[i][j].showIcon = false;
        }
      }
    }
    iconList[data.rIndex][data.cIndex].showIcon = true;
    this.setState({ iconList });
  };

  /**
   *  This function used to set highestscore
   *  in localstorage.
   */
  updateHighestScore = cScore => {
    const highestScore = localStorage.getItem("highestScore");
    if (!highestScore) {
      localStorage.setItem("highestScore", cScore);
    } else if (parseInt(cScore) > parseInt(highestScore)) {
      localStorage.setItem("highestScore", cScore);
    }
  };

  /***
   * Used to calculate the dynamic arrow position to denote
   * the near by diamond inside each square.
   */
  updateArrowDirection = data => {
    const { iconList, diamondPosition, nbrOfRows } = this.state;
    let customClass = "";
    if (iconList[data.rIndex][data.cIndex].isDiamond) {
      return;
    }
    const diamondIndex = diamondPosition[data.rIndex];
    const prevRow = data["rIndex"] - 1;
    const nextRow = data["rIndex"] + 1;
    // if first row this condition will skip.
    if (prevRow > -1 && iconList[prevRow][data.cIndex].isDiamond) {
      customClass = "arrow-up";
    } else if (
      // if last row this condition will skip.
      nextRow !== parseInt(nbrOfRows) &&
      iconList[nextRow][data.cIndex].isDiamond
    ) {
      customClass = "arrow-down";
    } else {
      customClass = diamondIndex > data["cIndex"] ? "arrow" : "arrow-left";
    }
    // update class.
    iconList[data.rIndex][data.cIndex].customClass = customClass;
    this.setState({ iconList });
  };

  render() {
    const {
      nbrOfRows,
      nbrOfCol,
      diamondPosition,
      diamondsLeft,
      currentScore,
      highestScore,
      iconList
    } = this.state;
    return (
      <React.Fragment>
        {diamondsLeft && (
          <section className="container">
            <section className="game-container">
              {[...Array(nbrOfRows)].map((i, rIndex) => (
                <section className="layout-container" key={rIndex}>
                  {[...Array(nbrOfCol)].map((v, cIndex) => (
                    <Cell
                      key={cIndex}
                      rIndex={rIndex}
                      cIndex={cIndex}
                      setPosition={diamondPosition[rIndex]}
                      countScore={this.countScore}
                      icon={iconList[rIndex][cIndex]}
                    />
                  ))}
                </section>
              ))}
            </section>
            <ScoreCard
              diamondsLeft={diamondsLeft}
              currentScore={currentScore}
              highestScore={highestScore}
            />
          </section>
        )}

        {diamondsLeft && (
          <section className="success">
            <h3 className="text">
              Congraj..! you have found all diamonds and your Score is{" "}
              {currentScore}
            </h3>
            <input
              type="button"
              className="button"
              onClick={this.setInitialValue}
              value="Play Again...!"
            />
          </section>
        )}
      </React.Fragment>
    );
  }
}

export default Board;