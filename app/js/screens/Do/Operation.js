import React, { Component, PropTypes } from 'react';
import { switchSection } from '../../actions';
import { connect } from 'react-redux';

import VariableSelector from './VariableSelector';

function select(state) {
  return {
    game: state.game,
    players: state.players,
    user: state.user
  }
}

@connect(select)
export default class Operation extends Component {
  renderSelector() {
    const {user, game} = this.props;
    const dec_vs = game.sections[user.cur_section].decleared_variables.operation;
    var VariableSelectors = [];
    for (let i = 0; i < 6; i++){
      let dec_vid = dec_vs.hasOwnProperty(i) ? dec_vs[i] : null;
      VariableSelectors.push(
        <VariableSelector
          key={i}
          line_num={i+1}
          dec_vid={dec_vid}
          field_type='operation'/>
      );
    }
    return VariableSelectors;
  }
  renderDisplay() {
    const {user, game} = this.props;
    const cur_section = user.cur_section;
    const dec_vs = game.sections[user.cur_section].decleared_variables.operation;
    var Values = [];
    for (let i = 0; i < 6; i++){
      if (dec_vs.hasOwnProperty(i)){
        let value = game.variables[dec_vs[i]].value ? game.variables[dec_vs[i]].value : 'null';
        Values.push(<div style={style.item} key={i}>vid:{dec_vs[i]}, value:{value}</div>);
      } else {
        Values.push(<div style={style.item} key={i}>-</div>);
      }
    }
    return (
      <div style={style.display}>{Values}</div>
    );
  }
  render() {
    const {game, user} = this.props;
    const VariableEditors = this.renderSelector();
    const Display = this.renderDisplay();
    return (
      <div style={style.base}>
        <div style={style.label}>OPERATION</div>
        <div style={style.selector}>{VariableEditors}</div>
        {Display}
        <div style={{clear:'both'}}></div>
      </div>
    ); 
  }
}

Operation.propTypes = {
}


const style = {
  base: {
    border: '1px solid black',
    minHeight: '100px'
  },
  label: {
//    border: '1px solid black',
    width: '20%',
    float: 'left',
  },
  selector: {
//    border: '1px solid black',
    width: '35%',
    float: 'left',
  },
  display: {
//    border: '1px solid black',
    width: '35%',
    float: 'left',
  },
}