import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { goNextScreen, goPreviousScreen, GameScreens } from '../actions';

export default class Nav extends Component {
  renderGoPreviousBtn() {
    const { gameScreen, dispatch } = this.props;
    if (gameScreen.cur_screen == 0){
      return null;
    } else {
      return (
        <button
          style={style.previous_btn}
          onClick={()=>dispatch(goPreviousScreen(gameScreen.cur_screen))}>
          Go Previous
        </button>
      );
    }
  }  
  renderGoNextBtn() {
    const { gameScreen, dispatch } = this.props;
    if (gameScreen.cur_screen == 4){
      return null;
    } else {
      const is_screen_available = gameScreen.enable_screens[gameScreen.cur_screen+1];
      if (is_screen_available){
        return (
          <button
            style={style.next_btn}
            onClick={()=>dispatch(goNextScreen(gameScreen.cur_screen))}>
            Go Next
          </button>
        );
      } else {
        return (
          <button
            disabled
            style={style.next_btn}
            onClick={()=>dispatch(goNextScreen(gameScreen.cur_screen))}>
            Go Next
          </button>
        );        
      }
    }
  }
  render() {
    const { dispatch, gameScreen } = this.props;
    const GoPreviousBtn = this.renderGoPreviousBtn();
    const GoNextBtn = this.renderGoNextBtn();
    return (
      <div style={style.base}>
        {GoPreviousBtn}
        {GoNextBtn}
        <p style={style.text}>
          Screen Index:{gameScreen.cur_screen}, Screen Name:{GameScreens[gameScreen.cur_screen]}
        </p>
      </div>
    )
  }
}

Nav.propTypes = {
//  onClick: PropTypes.func.isRequired,
//  text: PropTypes.string.isRequired,
//  completed: PropTypesgameScreen: state.gameScreens,.bool.isRequired
}

const style = {
  base: {
    left:'0px',
    right:'1px',
    top:'0px',
    height:'100px',
    position: 'absolute'
  },
  next_btn: {
    position: 'absolute',
    top: '20px',
    right: '20px'
  },
  previous_btn: {
    position: 'absolute',
    top: '20px',
    left: '20px'
  },
  text: {
    position: 'absolute',
    top: '60px',
    left: '20px'
  },
}



function select(state) {
  return {
    gameScreen: state.gameScreens,
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Nav)