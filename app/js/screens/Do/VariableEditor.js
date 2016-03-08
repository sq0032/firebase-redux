import React, { Component, PropTypes } from 'react';
import { addAndUpdateVariable, removeAndUpdateVariable, nameVariable } from '../../actions';
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
  constructor(props) {
    super(props);
    this.state = {
      is_editor_hover: false
    };
  }
  handleMouseEnterEditor() {
    this.setState({is_editor_hover: true});
  }
  handleMouseLeaveEditor() {
    this.setState({is_editor_hover: false});
  }
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
  handleSelectFirstName(e) {
    const {dispatch, dec_vid} = this.props;
    const first_name_id = e.target.value == '' ? null : e.target.value;
    dispatch(nameVariable(first_name_id, 'first', dec_vid));
  }
  handleSelectMiddleName(e) {
    const {dispatch, dec_vid} = this.props;
    const middle_name_id = e.target.value == '' ? null : e.target.value;
    dispatch(nameVariable(middle_name_id, 'middle', dec_vid));
  }
  handleSelectLastName(e) {
    const {dispatch, dec_vid} = this.props;
    const last_name_id = e.target.value == '' ? null : e.target.value;
    dispatch(nameVariable(last_name_id, 'last', dec_vid));
  }
  renderNameOptions(name_section) {
    const {game} = this.props;
    var NameOptions = [];
    NameOptions.push(
      <option value={''} key={null}>-</option>
    );
    for(let key in game.variable_names[name_section]){
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
        onChange={this.handleSelectFirstName.bind(this)}
        style={style.select}
        value={first_name_id}
      >{FirstNameOptions}</select>
    );
    const MiddleNameSelector = (
      <select
        onChange={this.handleSelectMiddleName.bind(this)}
        style={style.select}
        value={middle_name_id}
      >{MiddleNameOptions}</select>
    );
    const LastNameSelector = (
      <select
        onChange={this.handleSelectLastName.bind(this)}
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
    const {type, game, user, line_num, dec_vid} = this.props;
    
//    console.log(`type: ${type}`);
//    console.log(`dec_vid: ${dec_vid}`);
    const Editor = this.renderEditor();
    const RemoveBtn = dec_vid == null ? null : (<button style={style.remove_btn} onClick={this.handleRemoveVariable.bind(this)}>x</button>);
    const editor_hover = this.state.is_editor_hover ? style.selector_hover : null;
    return (
      <div style={style.base}>
        <div style={style.line}>{line_num}</div>
        <div style={{...style.selector_td, ...editor_hover}}
             onMouseEnter={this.handleMouseEnterEditor.bind(this)}
             onMouseLeave={this.handleMouseLeaveEditor.bind(this)}>      
              {Editor}
        </div>
        <div style={style.remove}>
          {RemoveBtn}
        </div>
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
    display: 'table-cell',
    verticalAlign: 'middle',
    minWidth: '250px',
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
  },
  button: {
    background: 'transparent',
    border: 'none',
    fontSize: '14px',
    height: '100%',
    padding: '0px',
    width: '268px',
    cursor: 'pointer',
  },
}