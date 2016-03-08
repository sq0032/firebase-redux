import React, { Component, PropTypes } from 'react';
import { openSection, SECTIONTYPE } from '../../actions';
import { connect } from 'react-redux';

import VariableDisplay from './VariableDisplay';

function select(state) {
  return {
    game: state.game,
    players: state.players,
    user: state.user
  }
}

@connect(select)
export default class Input extends Component {
  constructor(props){
    super(props);
    this.state = {
      is_mouse_hover_label: false
    }
  }
  handleOpenSection() {
    const {dispatch, user} = this.props;
    dispatch(openSection(user.cur_section, SECTIONTYPE.INPUT));
    this.setState({
      is_mouse_hover_label: false      
    });
  }
  handleMouseEnterLabel() {
    this.setState({is_mouse_hover_label:true});
  }
  handleMouseLeaveLabel() {
    this.setState({is_mouse_hover_label:false});
  }    
  renderSelector() {
    const {user, game} = this.props;
    const def_vs = game.sections[user.cur_section].default_variables.input;
    const dec_vs = game.sections[user.cur_section].decleared_variables.input;
    var VariableDisplays = [];
    for (let i = 0; i < 6; i++){
      let dec_vid = dec_vs.hasOwnProperty(i) ? dec_vs[i] : null;
      VariableDisplays.push(
        <VariableDisplay 
          key={i} 
          line_num={i+1}
          vid={dec_vid}
          type='input'/>
      );
    }
    return VariableDisplays;
  }
  renderDisplay() {
    const {user, game} = this.props;
    const cur_section = user.cur_section;
    const dec_vs = game.sections[cur_section].decleared_variables.input;

    var Values = [];
    for (let key in dec_vs){
      if(dec_vs[key]==null){continue;}
      const name = game.variables[dec_vs[key]].name;
      const first = game.variable_names.first[name.first];
      const middle = game.variable_names.middle[name.middle];
      const last = game.variable_names.last[name.last];
      const comment = game.variables[dec_vs[key]].comment;
      const comment_div = (<span style={{backgroundColor:"yellow"}}>{comment}</span>);
      Values.push(
        <div style={style.item} key={key}>
          {first} {middle} {last} {comment_div}
        </div>
      );
    }
    return (
      <div style={style.display}>{Values}</div>
    );
  }
  render() {
    const {game, user} = this.props;
    if (game.sections[user.cur_section].is_input_opened){
      const VariableEditors = this.renderSelector();
      const Display = this.renderDisplay();
      return (
        <div style={style.base}>
          <div style={style.display}>{Display}</div>
          <div style={style.label_wrap}>
            <div style={style.label}>&gt;</div>
          </div>
          <div style={style.selector}>
            <div style={style.selector_header}>INPUT</div>
            <div style={style.selector_table}>
              {VariableEditors}
            </div>
          </div>
          <div style={{clear:'both'}}></div>
        </div>
      );    
    } else {
      const hover_label = this.state.is_mouse_hover_label ? style.label_hover : null;
      return (
        <div style={style.base}>
          <div style={style.display}></div>
          <div style={style.label_wrap}>
            <div style={{...style.label, ...hover_label}}
              onClick={this.handleOpenSection.bind(this)}
              onMouseEnter={this.handleMouseEnterLabel.bind(this)}
              onMouseLeave={this.handleMouseLeaveLabel.bind(this)}>
            </div>
          </div>
          <div style={style.selector}>
          </div>
          <div style={{clear:'both'}}></div>
        </div>
      );
    }
  }
}

Input.propTypes = {
}


const style = {
  base: {
    height: '110px',
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
    fontSize: '400%',
    lineHeight: '100px',
    textAlign: 'center',
    width: '100px',
    height: '100px',
    display: 'inline-block'
  },
  label_hover:{
    backgroundColor: 'yellow',
    cursor: 'pointer'
  },
}