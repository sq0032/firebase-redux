import React, { Component, PropTypes } from 'react';
import { openSection, SECTIONTYPE } from '../../actions';
import { connect } from 'react-redux';

import VariableSelector from './VariableSelector';

function select(state) {
  return {
    game: state.game,
    players: state.players,
    user: state.user
  }
}

@connect(select)
export default class Output extends Component {
  constructor(props){
    super(props);
    this.state = {
      is_mouse_hover_label: false
    }
  }
  handleOpenSection() {
    const {dispatch, user} = this.props;
    dispatch(openSection(user.cur_section, SECTIONTYPE.OUTPUT));
  }
  handleMouseEnterLabel() {
    this.setState({is_mouse_hover_label:true});
  }
  handleMouseLeaveLabel() {
    this.setState({is_mouse_hover_label:false});
  }
  renderSelector() {
    const {user, game} = this.props;
    const dec_vs = game.sections[user.cur_section].decleared_variables.output;
    const num_outputs = game.sections[user.cur_section].num_outputs;
    var VariableSelectors = [];
    for (let i = 0; i < num_outputs; i++){
      let dec_vid = dec_vs.hasOwnProperty(i) ? dec_vs[i] : null;
      VariableSelectors.push(
        <VariableSelector 
          key={i} 
          line_num={i+1}
          dec_vid={dec_vid}
          field_type='output'/>
      );
    }
    return VariableSelectors;
  }
  renderDisplay() {
    const {user, game} = this.props;
    const cur_section = user.cur_section;
    const dec_vs = game.sections[user.cur_section].decleared_variables.output;
//    const Values = dec_vs.map((id, index)=>{
//      if (typeof(id)=='undefined'||id==null){
//        console.log('return null');
//        return (<div style={style.item} key={index}>-</div>);
//      }
//      let value = game.variables[id].value ? game.variables[id].value : 'null';
//      return (
//        <div style={style.item} key={index}>{value}</div>
//      );
//    });
    var Values = [];
    for (let key in dec_vs){
      if(dec_vs[key]==null){continue;}
      const name = game.variables[dec_vs[key]].name;
      const first = game.variable_names.first[name.first];
      const middle = game.variable_names.middle[name.middle];
      const last = game.variable_names.last[name.last];
      const commend = game.variable_names.commend;
      const commend_div = (<span style={{backgroundColor:"yellow"}}>{commend}</span>);
      Values.push(
        <div style={style.item} key={key}>
          {first} {middle} {last} {commend_div}
        </div>
      );
    }
//    for (let i = 0; i < 6; i++){
//      if (dec_vs.hasOwnProperty(i)){
//        let value = game.variables[dec_vs[i]].value ? game.variables[dec_vs[i]].value : 'null';
//        Values.push(<div style={style.item} key={i}>{value}</div>);
//      } else {
//        Values.push(<div style={style.item} key={i}>-</div>);
//      }
//    }    
    return (
      <div style={style.display}>{Values}</div>
    );
  }  
  render() {
    const {game, user} = this.props;
    if (game.sections[user.cur_section].is_output_opened){
      const VariableEditors = this.renderSelector();
      const Display = this.renderDisplay();
      return (
        <div style={style.base}>
          <div style={style.display}>{Display}</div>
          <div style={style.label_wrap}>
            <div style={style.label}>!</div>
          </div>
          <div style={style.selector}>
            <div style={style.selector_header}>OUTPUT</div>
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

Output.propTypes = {
}


const style = {
  base: {
    minHeight: '100px',
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