import React, { Component, PropTypes } from 'react';
import { addVariable, removeVariable } from '../../actions';
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
  handleSelectVariable(e) {
    const {dispatch, user, line_num, type, dec_vid} = this.props;
    const section_id = user.cur_section;
    const vid = e.target.value;
    if (vid == 'default'){
      dispatch(removeVariable(section_id, line_num, type));
    } else {
      dispatch(addVariable(section_id, line_num, type, vid));
    }
  }
  renderSelector() {
    const {dec_vid, line_num, type, user, game} = this.props;
    const variables = game.variables;
//    if (dec_vid == null){
      const DefaultOption = (<option key={'default'} value={'default'}>------Select-----</option>)
      const InputDivider = (<option disabled key={'input'}>------Input-----</option>)
      const InputOptions = game.sections[user.cur_section].decleared_variables.input.map((vid)=>{
        if (!vid){return null;}
        const name = game.variables[vid].name;
        let first = name ? (name.first ? name.first : '???') : '???';
        let middle = name ? (name.middle ? name.middle : '???') : '???';
        let last = name ? (name.last ? name.last : '???') : '???';        
        return (
          <option value={vid} key={'input'+vid}>{first} {middle} {last}</option>
        );
      });
      const QuestionDivider = (<option disabled key={'question'}>------Question-----</option>)
      const QuestionOptions = game.sections[user.cur_section].decleared_variables.question.map((vid)=>{
        if (!vid){return null;}
        const name = game.variables[vid].name;
        let first = name ? (name.first ? name.first : '???') : '???';
        let middle = name ? (name.middle ? name.middle : '???') : '???';
        let last = name ? (name.last ? name.last : '???') : '???';        
        return (
          <option value={vid} key={'question'+vid}>{first} {middle} {last}</option>
        );
      });
      const Options = [
        DefaultOption,
        InputDivider,
        InputOptions,
        QuestionDivider,
        QuestionOptions
      ]
      return (
        <select onChange={this.handleSelectVariable.bind(this)} value={dec_vid ? dec_vid : 'default'}>
          {Options}
        </select>
      );
//    }
  }  
  render() {
    const {line_num, game, user} = this.props;
    const Selector = this.renderSelector();
    return (
      <div style={style.base}>
        {line_num}:{Selector}
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