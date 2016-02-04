import React, { Component, PropTypes } from 'react';
import {Motion, spring} from 'react-motion';

export default class Intro extends Component {
  render() {
    const left = 100*this.props.offset;
    return (
      <Motion style={{left: spring(left)}}>
        {value =>
          <div style={{...style.base, left:`${value.left}%`}}>
            Intro
            <p>{value.left}</p>
          </div>
        }
      </Motion>
    )
  }
}

Intro.propTypes = {
}

const style = {
  base: {
    width: '100%',
    height: '100%',
    border: '1px solid black',
    position: 'absolute',
    backgroundColor: '#FFF',
    padding: '40px'
  }
}