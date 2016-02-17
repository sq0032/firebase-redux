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
      let dec_vid = dec_vs[i] ? dec_vs[i] : null;
      VariableSelectors.push(
        <VariableSelector 
          key={i} 
          line_num={i+1}
          dec_vid={dec_vid}
          type='operation'/>
      );
    }
    return VariableSelectors;
  }
  renderDisplay() {
    const {user, game} = this.props;
    const cur_section = user.cur_section;
    const dec_vs = game.sections[user.cur_section].decleared_variables.operation;
    const Values = dec_vs.map((id, index)=>{
      if (typeof(id)=='undefined'||id==null){
        console.log('return null');
        return (<div style={style.item} key={index}>-</div>);
      }
      let value = game.variables[id].value ? game.variables[id].value : 'null';
      return (
        <div style={style.item} key={index}>{value}</div>
      );
    });    
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
        <p style={{clear:'both'}}>Operation</p>
        <div style={style.label}>Operation</div>
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