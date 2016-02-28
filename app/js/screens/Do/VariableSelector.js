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
      const vid = variables[key];
      if (typeof(game.variables[vid].name) == 'undefined'){
        InputOptions.push(
          <option value={vid} key={type+vid}>??? ??? ???</option>     
        );
      } else {
        const name = game.variables[vid].name;
        let first = name ? (name.first ? name.first : '???') : '???';
        let middle = name ? (name.middle ? name.middle : '???') : '???';
        let last = name ? (name.last ? name.last : '???') : '???';
        InputOptions.push(
          <option value={vid} key={type+vid}>{first} {middle} {last}</option>
        );
      }
    }
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
        <select style={style.select} onChange={this.handleSelectVariable.bind(this)} value={dec_vid ? dec_vid : 'default'}>
          {Options}
        </select>
      );
  }  
  render() {
    const {line_num, game, user} = this.props;
    const Selector = this.renderSelector();
    return (
      <div style={style.base}>
        <div style={style.line}>{line_num}</div>
        <div style={style.selector_td}>{Selector}</div>
      </div>
    );
  }
}

VariableSelector.propTypes = {
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
    display: 'table-cell'
  },
  select: {
   background: 'transparent',
   border: 'none',
   fontSize: '14px',
   height: '29px',
   padding: '5px',
   width: '268px',
  }
}