import React, { Component, PropTypes } from 'react';
//import { nameVariable } from '../../actions';
import { connect } from 'react-redux';

function select(state) {
  return {
    game: state.game,
    players: state.players,
    user: state.user
  }
}

@connect(select)
export default class VariableDisplay extends Component {
  renderDisplay() {
    const {vid, line_num, user, game} = this.props;
    if (vid == null){
      return null;
    } else {
      const name = game.variables[vid].name;
      const first = game.variable_names.first[name.first];
      const middle = game.variable_names.middle[name.middle];
      const last = game.variable_names.last[name.last];
      return (
        <div>{first} {middle} {last}</div>
      );
    }
  }
  render() {
    const {game, user, line_num, vid} = this.props;
    const Display = this.renderDisplay();
    console.log(`VariableDisplay vid: ${vid}`);
    return (
      <div style={style.base}>
        <div style={style.line}>{line_num}</div>
        <div style={style.selector_td}>{Display}</div>
        <div style={style.remove}>
        </div>
      </div>
    );    
  }
}


VariableDisplay.propTypes = {
  line_num: React.PropTypes.number.isRequired,
  vid: React.PropTypes.number,
}


const style = {
  base: {
//   background: 'url(http://i62.tinypic.com/15xvbd5.png) no-repeat 96% 0',
   display: 'table-row',
   height: '29px',
   overflow: 'hidden',
   width: '240px',
                   
   backgroundColor: 'rgb(239, 235, 171)',
   borderBottom: '1px solid black',
  },
  line: {
    padding: '4px',
    borderRight: '1px solid red',
    display: 'table-cell'
  },
  selector_td: {
    display: 'table-cell',
    verticalAlign: 'middle',
    minWidth: '250px'
  },
  selector_hover: {
    border: '1px solid red'
  },  
  remove: {
    display: 'table-cell',
    padding: '0px 4px 0px 4px',
  },
  remove_btn: {
    color: 'red',
  },
  select: {
    background: 'transparent',
    border: 'none',
    fontSize: '14px',
  },
  button: {
    background: 'transparent',
    border: 'none',
    fontSize: '14px',
    height: '100%',
    padding: '0px',
    width: '268px',
    cursor: 'pointer',
  },
}