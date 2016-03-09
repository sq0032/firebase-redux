import React, { Component, PropTypes } from 'react';
import {Motion, spring} from 'react-motion';
import {GameScreens} from '../actions'

import Intro from './Intro';
import Read from './Read';
import Plan from './Plan/Base';
import Do from './Do/Base';
import Test from './Test';

export default class Screen extends Component {
  render() {
    const left = 100*this.props.offset;
    let Screen = null;
    console.log(left);
    switch (this.props.screen){
      case GameScreens[0]:
        Screen = <Intro />;
        break;
      case GameScreens[1]:
        Screen = <Read />;
        break;
      case GameScreens[2]:
        Screen = <Plan />;
        break;
      case GameScreens[3]:
        Screen = <Do />;
        break;
      case GameScreens[4]:
        Screen = <Test />;
        break;
    }
    
    return (
      <Motion style={{left: spring(left)}}>
        {value => {
            const left_str = value.left.toString()+'%';
            return (
              <div style={{...style.base, left:left_str}}>
                {Screen}
              </div>
            )
          }
        }
      </Motion>
    )
  }
}

Screen.propTypes = {
  
}

const style = {
  base: {
    
//    width: '100%',
//    height: '100%',
    top: '100px',
    left: '0px',
    right: '200px',
    marginLeft: 'auto',
    marginRight: 'auto',
//    width: '1080px',
    bottom: '0px', 
    border: '1px solid black',
    position: 'absolute',
    backgroundColor: '#CCC',
    padding: '20px',
    overflowY: 'auto'
  }
}