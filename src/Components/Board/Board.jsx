import React, { Component } from 'react';
import Cell from "../Cell/Cell";
import './Board.css';

class Board extends Component {
    constructor(props) {
        super(props);
        // state initialization.
        this.state = {
            nbrOfRows: 8,
            nbrOfCol: 8
        }
    }

    componentDidMount() {
        // generate rows & Col.
    }

    render() {
        const { nbrOfRows, nbrOfCol } = this.state;
        return (
            <React.Fragment>
                <div className="container">
                 <div className="game-container">
                    {
                        [...Array(nbrOfCol)].map((i, index) => (
                            <div className="layout-container" key={index}>
                                <Cell nbrOfRows={nbrOfRows} />
                            </div>
                        ))
                    }
                 </div>

                 <div className="score-board">
                    <div className="title">Score Board</div>
                    <div className="info">Your Highest Score : </div>
                    <div className="info">Diamonds yet to be found : </div>
                    <div className="info">Your Current Score : </div>
                 </div>
                 </div>
            </React.Fragment>
        )
    }
}

export default Board;