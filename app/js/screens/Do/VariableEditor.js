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
export default class VariableEditor extends Component {
  handleAddVariable() {
    const {dispatch, user, line_num, type, def_vid} = this.props;
    const section_id = user.cur_section;
    if (def_vid){
      dispatch(addVariable(section_id, line_num, type, def_vid));
    } else {
      dispatch(addVariable(section_id, line_num, type));
    }
  }
  handleRemoveVariable() {
    const {dispatch, user, line_num, type} = this.props;
    const section_id = user.cur_section;
    dispatch(removeVariable(section_id, line_num, type));
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
        {line_num}:{Editor}
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
//    border: '1px solid black',
//    minHeight: '100px'
  },
}