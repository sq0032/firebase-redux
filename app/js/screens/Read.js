import React, { Component, PropTypes } from 'react';
import {Motion, spring} from 'react-motion';

export default class Read extends Component {
  render() {
    const left = 100*this.props.offset;
    return (
      <Motion style={{left: spring(left)}}>
        {value =>
          <div style={{...style.base, left:`${value.left}%`}}>
            Read
            <p>{value.left}</p>
          </div>
        }
      </Motion>
    )
  }
}

Read.propTypes = {
}

const style = {
  base: {
    width: '100%',
    height: '100%',
    border: '1px solid black',
    position: 'absolute',
    backgroundColor: '#EEE',
    padding: '40px'
  }
}