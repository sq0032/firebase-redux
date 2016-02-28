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
export default class Output extends Component {
  renderSelector() {
    const {user, game} = this.props;
    const dec_vs = game.sections[user.cur_section].decleared_variables.output;
    const num_outputs = game.sections[user.cur_section].num_outputs;
    var VariableSelectors = [];
    for (let i = 0; i < num_outputs; i++){
      let dec_vid = dec_vs.hasOwnProperty(i) ? dec_vs[i] : null;
      VariableSelectors.push(
        <VariableSelector 
          key={i} 
          line_num={i+1}
          dec_vid={dec_vid}
          field_type='output'/>
      );
    }
    return VariableSelectors;
  }
  renderDisplay() {
    const {user, game} = this.props;
    const cur_section = user.cur_section;
    const dec_vs = game.sections[user.cur_section].decleared_variables.output;
//    const Values = dec_vs.map((id, index)=>{
//      if (typeof(id)=='undefined'||id==null){
//        console.log('return null');
//        return (<div style={style.item} key={index}>-</div>);
//      }
//      let value = game.variables[id].value ? game.variables[id].value : 'null';
//      return (
//        <div style={style.item} key={index}>{value}</div>
//      );
//    });
    var Values = [];
    for (let i = 0; i < 6; i++){
      if (dec_vs.hasOwnProperty(i)){
        let value = game.variables[dec_vs[i]].value ? game.variables[dec_vs[i]].value : 'null';
        Values.push(<div style={style.item} key={i}>{value}</div>);
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
        {Display}
        <div style={style.label}>OUTPUT</div>
        <div style={style.selector}>{VariableEditors}</div>
        <div style={{clear:'both'}}></div>
      </div>
    );  
  }
}

Output.propTypes = {
}


const style = {
  base: {
    border: '1px solid black',
    minHeight: '100px',
    display: 'table-row'
  },
  label: {
    border: '1px solid black',
    borderRadius: '50%',
    lineHeight: '100px',
    textAlign: 'center',
    width: '100px',
    height: '100px',
    float: 'left',
  },
  selector: {
    border: '1px solid black',
    width: '35%',
    float: 'right',
  },
  display: {
    border: '1px solid black',
    width: '35%',
    float: 'left',
  },
}