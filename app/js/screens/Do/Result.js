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
export default class Result extends Component {
  render() {
    const {game, user} = this.props;
    return (
      <div style={style.base}>
        Result
      </div>
    );    
  }
}

Result.propTypes = {
}


const style = {
  base: {
    border: '1px solid black',
    minHeight: '100px'
  },
  label: {
    border: '1px solid black',
    width: '20%',
    float: 'left',
  },
  selector: {
    border: '1px solid black',
    width: '35%',
    float: 'left',
  },
  display: {
    border: '1px solid black',
    width: '35%',
    float: 'left',
  },
}