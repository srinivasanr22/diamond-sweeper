import React, { Component } from "react";
import { QUESTION_MARK } from "../../assets/images/index";
import "./Cell.css";

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressed: false
    };
  }

  /***
   * This function will emit event 
   * to its parent component.
   */
  findDiamond = (isDiamond) => {
    const {isPressed}= this.state;
    const {rIndex, cIndex} = this.props;
    const data = { rIndex : rIndex,  cIndex: cIndex, isDiamond: isDiamond };
    if (!isPressed) {
      this.setState({ isPressed: true});
      this.props.countScore(data);
    }
  };

  render() {
    const { cIndex, setPosition, icon } = this.props;
    const { isPressed } = this.state;
    return (
      <React.Fragment>
        <section className='cell' onClick={() => this.findDiamond(cIndex === setPosition)}>
           { !isPressed && <img src={QUESTION_MARK} alt="QUESTION" /> }
           { isPressed && icon.showIcon ? <img src={icon.src} className={icon.customClass} alt={icon.alt} /> : ''}
        </section>
      </React.Fragment>
    );
  }
}

export default Cell;