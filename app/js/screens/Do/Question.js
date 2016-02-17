import React, { Component, PropTypes } from 'react';
import { switchSection } from '../../actions';
import { connect } from 'react-redux';

import VariableEditor from './VariableEditor';

function select(state) {
  return {
    game: state.game,
    players: state.players,
    user: state.user
  }
}

@connect(select)
export default class Question extends Component {
  renderSelector() {
    const {user, game} = this.props;
    const def_vs = game.sections[user.cur_section].default_variables.question;
    const dec_vs = game.sections[user.cur_section].decleared_variables.question;
    var VariableEditors = [];
    for (let i = 0; i < 6; i++){
      let def_vid = def_vs[i] ? def_vs[i] : null;
      let dec_vid = dec_vs[i] ? dec_vs[i] : null;
      VariableEditors.push(
        <VariableEditor 
          key={i} 
          line_num={i+1}
          def_vid={def_vid}
          dec_vid={dec_vid}
          type='question'/>
      );
    }
    return VariableEditors;
  }
  renderDisplay() {
    const {user, game} = this.props;
    const cur_section = user.cur_section;
    const dec_vs = game.sections[user.cur_section].decleared_variables.question;
    const Values = dec_vs.map((id, index)=>{
      console.log(id);
      console.log(typeof(id)=='undefined');
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
        <p style={{clear:'both'}}>Question</p>
        <div style={style.label}>Question</div>
        <div style={style.selector}>{VariableEditors}</div>
        {Display}
        <div style={{clear:'both'}}></div>
      </div>
    );    
  }
}

Question.propTypes = {
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
  item: {
    height: '21px',
  },
}