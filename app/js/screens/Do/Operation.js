import React, { Component, PropTypes } from 'react';
import { openSection, SECTIONTYPE } from '../../actions';
import { connect } from 'react-redux';

import VariableSelector from './VariableSelector';
import OperationSelector from './OperationSelector';

function select(state) {
  return {
    game: state.game,
    players: state.players,
    user: state.user
  }
}

@connect(select)
export default class Operation extends Component {
  constructor(props){
    super(props);
    this.state = {
      is_mouse_hover_label: false
    }
  }
  handleOpenSection() {
    const {dispatch, user} = this.props;
    dispatch(openSection(user.cur_section, SECTIONTYPE.OPERATION));
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
    const dec_vs = game.sections[user.cur_section].decleared_variables.operation;
    var VariableSelectors = [];
    for (let i = 0; i < 6; i++){
      let dec_vid = dec_vs.hasOwnProperty(i) ? dec_vs[i] : null;
      VariableSelectors.push(
        <VariableSelector
          key={i}
          line_num={i+1}
          dec_vid={dec_vid}
          field_type='operation'/>
      );
    }
    return VariableSelectors;
  }
  renderDisplay() {
    const {user, game} = this.props;
    const cur_section = user.cur_section;
    const dec_vs = game.sections[user.cur_section].decleared_variables.operation;
    var Values = [];
    for (let i = 0; i < 6; i++){
      if (dec_vs.hasOwnProperty(i) && dec_vs[i] != null){
        let value = game.variables[dec_vs[i]].value ? game.variables[dec_vs[i]].value : 'null';
        Values.push(<div style={style.item} key={i}>vid:{dec_vs[i]}, value:{value}</div>);
      } else {
        Values.push(<div style={style.item} key={i}>-</div>);
      }
    }
    return Values;
  }
  render() {
    const {game, user} = this.props;
    const hover_label = this.state.is_mouse_hover_label ? style.label_hover : null;
    const section = game.sections[user.cur_section];
    if (section.is_operation_opened){
      const answer = game.answers[section.answer];
      const operation_name = section.operation == null ? null : game.operations[section.operation].name;
      const operation_description = section.operation == null ? 'Click square to select an operation' : game.operations[section.operation].description;
      const VariableEditors = this.renderSelector();
      const Display = this.renderDisplay();
      return (
        <div style={style.base}>
          <div style={style.display}>{operation_description}</div>
          <div style={style.label_wrap}>
            <div style={{...style.label, ...hover_label}}
              onMouseEnter={this.handleMouseEnterLabel.bind(this)}
              onMouseLeave={this.handleMouseLeaveLabel.bind(this)}>
                <OperationSelector/>
            </div>
          </div>
          <div style={style.selector}>
            <div style={style.selector_header}>{operation_name}</div>
            <div style={style.selector_table}>
              {VariableEditors}
            </div>
          </div>
          <div style={{clear:'both'}}></div>
        </div>
      );    
    } else {
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

Operation.propTypes = {
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