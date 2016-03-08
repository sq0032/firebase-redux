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
  constructor(props) {
    super(props);
    this.state = {
      is_selector_hover: false
    };
  }
  handleMouseEnterSelector() {
    this.setState({is_selector_hover: true});
  }
  handleMouseLeaveSelector() {
    this.setState({is_selector_hover: false});
  }  
  handleSelectVariable(e) {
    const {dispatch, user, line_num, field_type} = this.props;
    const section_id = user.cur_section;
    const vid = e.target.value;
    if (vid == 'default'){
      dispatch(removeAndUpdateVariable(section_id, line_num, field_type));
    } else {
      dispatch(addAndUpdateVariable(section_id, line_num, field_type, vid));
    }
  }
  handleRemoveVariable(){
    const {dispatch, user, line_num, field_type} = this.props;
    const section_id = user.cur_section;
    dispatch(removeAndUpdateVariable(section_id, line_num, field_type));
  }
  renderOptions(type) {
    const {user, game} = this.props;
    const cate = (type == 'result') ? 'default_variables' : 'decleared_variables';
    const variables = game.sections[user.cur_section][cate][type];
    var InputOptions = [];
    for(let key in variables){
      const vid = variables[key];
      if (vid == null || typeof(game.variables[vid].name) == 'undefined'){continue;}
      const name = game.variables[vid].name;
      if (name == null || name.first == null || name.middle == null || name.last == null){continue;}
      let first = game.variable_names.first[name.first];
      let middle = game.variable_names.middle[name.middle];
      let last = game.variable_names.last[name.last];
      InputOptions.push(
        <option value={vid} key={type+vid}>{first} {middle} {last}</option>
      );
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
    const {line_num, game, user, dec_vid} = this.props;
    const Selector = this.renderSelector();
    const RemoveBtn = dec_vid == null ? null : (<button style={style.remove_btn} onClick={this.handleRemoveVariable.bind(this)}>x</button>);
    const selector_hover = this.state.is_selector_hover ? style.selector_hover : null;
    return (
      <div style={style.base}>
        <div style={style.line}>{line_num}</div>
        <div style={{...style.selector_td, ...selector_hover}}
             onMouseEnter={this.handleMouseEnterSelector.bind(this)}
             onMouseLeave={this.handleMouseLeaveSelector.bind(this)}>
              {Selector}</div>
        <div style={style.remove}>
          {RemoveBtn}
        </div>
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
    display: 'table-cell',
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
    cursor: 'pointer'
  }, 
  select: {
   background: 'transparent',
   border: 'none',
   fontSize: '14px',
   height: '29px',
   padding: '5px',
   width: '268px',
   cursor: 'pointer'
  }
}