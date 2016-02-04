import React, { Component, PropTypes } from 'react';
import {Motion, spring} from 'react-motion';

export default class Do extends Component {
  render() {
    const left = 100*this.props.offset;
    console.log(left);
    return (
      <Motion style={{left: spring(left)}}>
        {value =>
          <div style={{...style.base, left:`${value.left}%`}}>
            Do
            <p>{value.left}</p>
          </div>
        }
      </Motion>
    )
  }
}

Do.propTypes = {
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