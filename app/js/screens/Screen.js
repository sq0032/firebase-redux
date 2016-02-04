import React, { Component, PropTypes } from 'react';
import {Motion, spring} from 'react-motion';
import {GameScreens} from '../actions'

import Intro from './Intro';
import Read from './Read';
import Plan from './Plan';
import Do from './Do';
import Test from './Test';

export default class Screen extends Component {
  render() {
    const left = 100*this.props.offset;
    switch (this.props.screen){
      case GameScreens[0]:
        return (
          <Motion style={{left: spring(left)}}>
            {value =>
              <div style={{...style.base, left:`${value.left}%`}}>
                <Intro />
              </div>
            }
          </Motion>
        )
      case GameScreens[1]:
        return (
          <Motion style={{left: spring(left)}}>
            {value =>
              <div style={{...style.base, left:`${value.left}%`}}>
                <Read />
              </div>
            }
          </Motion>
        )
      case GameScreens[2]:
        return (
          <Motion style={{left: spring(left)}}>
            {value =>
              <div style={{...style.base, left:`${value.left}%`}}>
                <Plan />
              </div>
            }
          </Motion>
        )
      case GameScreens[3]:
        return (
          <Motion style={{left: spring(left)}}>
            {value =>
              <div style={{...style.base, left:`${value.left}%`}}>
                <Do />
              </div>
            }
          </Motion>
        )
      case GameScreens[4]:
        return (
          <Motion style={{left: spring(left)}}>
            {value =>
              <div style={{...style.base, left:`${value.left}%`}}>
                <Test />
              </div>
            }
          </Motion>
        )
    }
  }
}

Screen.propTypes = {
  
}

const style = {
  base: {
    width: '100%',
    height: '100%',
    border: '1px solid black',
    position: 'absolute',
    backgroundColor: '#CCC',
    padding: '40px'
  }
}