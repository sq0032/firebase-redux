import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

function select(state) {
  return {
    game: state.game,
  }
}
@connect(select)
export default class Plan extends Component {
  render() {
    return (
      <div>
        Plan
      </div>
    )
  }
}

Plan.propTypes = {
}



const style = {
  sections: {
    top: '100px',
    left: '50px',
  },
}