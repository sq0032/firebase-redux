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
export default class VariableEditor extends Component {
  handleAddVariable() {
    const {dispatch, user, line_num, type, def_vid} = this.props;
    const section_id = user.cur_section;
    if (def_vid){
      dispatch(addAndUpdateVariable(section_id, line_num, type, def_vid));
    } else {
      dispatch(addAndUpdateVariable(section_id, line_num, type));
    }
  }
  handleRemoveVariable() {
    const {dispatch, user, line_num, type} = this.props;
    const section_id = user.cur_section;
    dispatch(removeAndUpdateVariable(section_id, line_num, type));
  }
  renderNameOptions(name_section) {
    const {game} = this.props;
    var NameOptions = [];
    NameOptions.push(
      <option value={null} key={null}>-</option>
    );
    console.log(`name_section: ${game.variable_names[name_section][0]}`);
    for(let key in game.variable_names[name_section]){
      console.log(key);
      NameOptions.push(
        <option value={key} key={key}>{game.variable_names[name_section][key]}</option>
      );
    }
    return NameOptions
  }
  renderNameSelector() {
    const {dec_vid, game} = this.props;
    const first_name_id = game.variables[dec_vid].name.first;
    const middle_name_id = game.variables[dec_vid].name.middle;
    const last_name_id = game.variables[dec_vid].name.last;
    
    const FirstNameOptions = this.renderNameOptions('first');
    const MiddleNameOptions = this.renderNameOptions('middle');
    const LastNameOptions = this.renderNameOptions('last');
    
    const FirstNameSelector = (
      <select
        style={style.select}
        value={first_name_id}
      >{FirstNameOptions}</select>
    );
    const MiddleNameSelector = (
      <select
        style={style.select}
        value={middle_name_id}
      >{MiddleNameOptions}</select>
    );
    const LastNameSelector = (
      <select
        style={style.select}
        value={last_name_id}
      >{LastNameOptions}</select>
    );
    
    return (
      <div>
        {FirstNameSelector}
        {MiddleNameSelector}
        {LastNameSelector}
      </div>
    )
  }
  renderEditor() {
    const {def_vid, dec_vid, line_num, type, user, game} = this.props;
    if (dec_vid == null){
      return (
        <button
          style={style.button}
          onClick={this.handleAddVariable.bind(this)}>
        </button>
      );
    } else {
      const NameSelector = this.renderNameSelector();
      return (
        <span>
          {NameSelector}
        </span>
      );
    }
  }
  render() {
    const {game, user, line_num} = this.props;
    const Editor = this.renderEditor();
    return (
      <div style={style.base}>
        <div style={style.line}>{line_num}</div>
        <div style={style.selector_td}>{Editor}</div>     
        <div style={style.remove} onClick={this.handleRemoveVariable.bind(this)}>x</div>
      </div>
    );    
  }
}


VariableEditor.propTypes = {
//  line_num
//  def_vid
//  dec_vid
//  type
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
  remove: {
    display: 'table-cell',
    color: 'red'
  },
  select: {
    background: 'transparent',
    border: 'none',
    fontSize: '14px',
//    height: '29px',
//    padding: '5px',
//    width: '268px',
  },
  button: {
    background: 'transparent',
    border: 'none',
    fontSize: '14px',
//    height: '29px',
    padding: '5px',
    width: '268px',    
  }
}