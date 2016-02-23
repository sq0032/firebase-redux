import React, { Component, PropTypes } from 'react';
import { addAndUpdateVariable, removeAndUpdateVariable } from '../../actions';
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
    const {dispatch, user, line_num, field_type, dec_vid} = this.props;
    const section_id = user.cur_section;
    const vid = e.target.value;
    if (vid == 'default'){
      dispatch(removeAndUpdateVariable(section_id, line_num, field_type));
    } else {
      dispatch(addAndUpdateVariable(section_id, line_num, field_type, vid));
    }
  }
  renderOptions(type) {
    const {user, game} = this.props;
    const cate = (type == 'result') ? 'default_variables' : 'decleared_variables';
    const variables = game.sections[user.cur_section][cate][type];
    var InputOptions = [];
    for(let key in variables){
      if (typeof(game.variables[key].name) == 'undefined'){
        InputOptions.push(
          <option value={vid} key={type+vid}>??? ??? ???</option>     
        );
      } else {
        const name = game.variables[key].name;
        let first = name ? (name.first ? name.first : '???') : '???';
        let middle = name ? (name.middle ? name.middle : '???') : '???';
        let last = name ? (name.last ? name.last : '???') : '???';
        InputOptions.push(
          <option value={key} key={type+key}>{first} {middle} {last}</option>
        );
      }
    }
//    const InputOptions = game.sections[user.cur_section][cate][type].map((vid)=>{
//      if (!vid){return null;}
//      if (typeof(game.variables[vid].name) == 'undefined'){
//        return (
//          <option value={vid} key={type+vid}>??? ??? ???</option>     
//        );
//      }      
//      const name = game.variables[vid].name;
//      let first = name ? (name.first ? name.first : '???') : '???';
//      let middle = name ? (name.middle ? name.middle : '???') : '???';
//      let last = name ? (name.last ? name.last : '???') : '???';        
//      return (
//        <option value={vid} key={type+vid}>{first} {middle} {last}</option>
//      );
//    });
    return InputOptions;
  }
  renderSelector() {
    const {dec_vid, field_type, user, game} = this.props;
    const variables = game.variables;
      const DefaultOption = (<option key={'default'} value={'default'}>------Select-----</option>);
      const InputDivider = (<option disabled key={'input'}>------Input-----</option>);
      const InputOptions = this.renderOptions('input');
      const QuestionDivider = (<option disabled key={'question'}>------Question-----</option>);
      const QuestionOptions = this.renderOptions('question');
      const ResultDivider = (field_type == 'output') ? (<option disabled key={'result'}>------Result-----</option>) : null;
      const ResultOptions = (field_type == 'output') ? this.renderOptions('result') : null;
      const Options = [
        DefaultOption,
        InputDivider,
        InputOptions,
        QuestionDivider,
        QuestionOptions,
        ResultDivider,
        ResultOptions            
      ]
      return (
        <select onChange={this.handleSelectVariable.bind(this)} value={dec_vid ? dec_vid : 'default'}>
          {Options}
        </select>
      );
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