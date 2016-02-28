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
      let def_vid = def_vs.hasOwnProperty(i) ? def_vs[i] : null;
      let dec_vid = dec_vs.hasOwnProperty(i) ? dec_vs[i] : null;
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
        <div style={style.display}>{game.sections[user.cur_section].text}</div>
        <div style={style.label_wrap}>
          <div style={style.label}>QUESTION</div>
        </div>
        <div style={style.selector}>
          <div style={style.selector_table}>
            {VariableEditors}
          </div>
        </div>
        <div style={{clear:'both'}}></div>
      </div>
    );    
  }
}

Question.propTypes = {
}


const style = {
  base: {
    minHeight: '100px',
    width: '100%',
    position: 'relative',
    display: 'table-row'
  },
  display: {
    width: '40%',
    display: 'table-cell',
    verticalAlign: 'middle',
    padding: '20px'
  },
  label_wrap:{
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center'
  },
  selector: {
    width: '40%',
    display: 'table-cell',
    padding: '20px'
  },
  selector_table: {
    display: 'table'
  },  
  label: {
    border: '1px solid black',
    borderRadius: '50%',
    lineHeight: '100px',
    textAlign: 'center',
    width: '100px',
    height: '100px',
    display: 'inline-block'
  },
  item: {
    height: '21px',
  },
}