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
export default class Input extends Component {
  renderSelector() {
    const {user, game} = this.props;
    const cur_section = user.cur_section;
//    const var_ids = game.sections[cur_section].decleared_variables.input;
    const var_ids = [1,2,3]
    const Options = var_ids.map((id)=>{
      const name = game.variables[id].name;
      let first = name ? (name.first ? name.first : '???') : '???';
      let middle = name ? (name.middle ? name.middle : '???') : '???';
      let last = name ? (name.last ? name.last : '???') : '???';
      return (
        <div key={game.variables[id].vid}>{game.variables[id].vid}:{first}/{middle}/{last}</div>
      );
    });
    return (
      <div style={style.selector}>{Options}</div>
    );
  }
  renderDisplay() {
    const {user, game} = this.props;
    const cur_section = user.cur_section;
//    const var_ids = game.sections[cur_section].decleared_variables.input;
    const var_ids = [1,2,3]
    const Values = var_ids.map((id)=>{
      let name = game.variables[id].name ? game.variables[id].name : 'null';
      return (
        <div key={game.variables[id].vid}>{name}</div>
      );
    });    
    return (
      <div style={style.display}>{Values}</div>
    );
  }
  render() {
    const {game, user} = this.props;
    const Selector = this.renderSelector();
    const Display = this.renderDisplay();
    return (
      <div style={style.base}>
        <div style={{clear:'both'}}>INPUT</div>
        <div style={style.label}>INPUT</div>
        {Selector}
        {Display}
        <div style={{clear:'both'}}></div>
      </div>
    );    
  }
}

Input.propTypes = {
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