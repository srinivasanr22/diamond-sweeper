import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
  render() {
      const {nbrOfRows} = this.props;
      return(
          <React.Fragment>
              {
                  [...Array(nbrOfRows)].map((i,index) => (
                     <div className="cell" key={index}></div>
                  ))
              }
          </React.Fragment>
      )
  }
}

export default Cell;