import React, { Component, PropTypes } from 'react'

export default class Test extends Component {
  render() {
    const offset = {
      left: `${100*this.props.offset}%`
    };
    return (
      <div style={{...style.base, ...offset}}>
        Test
      </div>
    )
  }
}

Test.propTypes = {
}

const style = {
  base: {
    width: '100%',
    height: '100%',
    border: '1px solid black',
    position: 'absolute'
  }
}