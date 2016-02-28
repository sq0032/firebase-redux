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
  renderEditor() {
    const {def_vid, dec_vid, line_num, type, user, game} = this.props;
    if (dec_vid == null){
      return (
        <button 
          onClick={this.handleAddVariable.bind(this)}>
          Add variable
        </button>
      );
    } else {
      if (typeof(game.variables[dec_vid].name) == 'undefined'){
        return (
          <span>
            ???/???/???
            <button 
              onClick={this.handleRemoveVariable.bind(this)}>
              Romove
            </button>
          </span>        
        );
      }
      const name = game.variables[dec_vid].name;
      let first = name ? (name.first ? name.first : '???') : '???';
      let middle = name ? (name.middle ? name.middle : '???') : '???';
      let last = name ? (name.last ? name.last : '???') : '???';
      return (
        <span>
          {first}/{middle}/{last}
          <button 
            onClick={this.handleRemoveVariable.bind(this)}>
            Romove
          </button>
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
  select: {
   background: 'transparent',
   border: 'none',
   fontSize: '14px',
   height: '29px',
   padding: '5px',
   width: '268px',
  }
}