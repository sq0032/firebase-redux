import React, { Component, PropTypes } from 'react';
import { switchSection } from '../../actions';
import { connect } from 'react-redux';

import Input from './Input';
import Question from './Question';
import Operation from './Operation';
import Result from './Result';
import Output from './Output';

function select(state) {
  return {
    game: state.game,
    players: state.players,
    user: state.user
  }
}

@connect(select)
export default class Board extends Component {
  render() {
    const {game, user} = this.props;
    return (
      <div style={style.base}>
        <Question/>
        <Operation/>
        <Result/>
      </div>
    );
//    return (
//      <div style={style.base}>
//        <Input/>
//        <Output/>
//      </div>
//    );
  }
}

Board.propTypes = {
}


const style = {
  base: {
    border: '1px solid red',
    display: 'table',
    width: '100%'
  },
}