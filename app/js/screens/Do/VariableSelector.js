import React, { Component, PropTypes } from 'react';
import { switchSection } from '../../actions';
import { connect } from 'react-redux';

function select(state) {
  return {
    game: state.game,
    players: state.players,
    user: state.user
  }
}

@connect(select)
export default class VariableSelector extends Component {
  render() {
    const {game, user} = this.props;
    return (
      <div style={style.base}>
        VariableSelector
      </div>
    );    
  }
}

VariableSelector.propTypes = {
}


const style = {
  base: {
//    border: '1px solid black',
//    minHeight: '100px'
  },
}