import React, { Component } from "react";
import Cell from "../Cell/Cell";
import ScoreCard from "../ScoreCard/ScoreCard";
import { DIAMOND, ARROW } from "../../assets/images/index";
import "./Board.css";

/***
 * Yet to do
 *  store the highest score.
 */

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
    const diamondsLeft = nbrOfCol;
    const currentScore = nbrOfRows * nbrOfCol;
    this.setState({ diamondsLeft, currentScore });
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
    if (prevRow > -1 && iconList[prevRow][data.cIndex].isDiamond) {
      customClass = "arrow-up";
    } else if (
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
      iconList
    } = this.state;
    return (
      <React.Fragment>
        {diamondsLeft && (
          <div className="container">
            <div className="game-container">
              {[...Array(nbrOfRows)].map((i, rIndex) => (
                <div className="layout-container" key={rIndex}>
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
                </div>
              ))}
            </div>
            <ScoreCard
              diamondsLeft={diamondsLeft}
              currentScore={currentScore}
            />
          </div>
        )}

        {!diamondsLeft && (
          <div className="success">
            Congraj..! you have found all diamonds and your Score is{" "}
            {currentScore}
            <input
              type="button"
              onClick={this.setInitialValue}
              value="Play Again...!"
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Board;