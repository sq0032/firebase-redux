import React, { Component, PropTypes } from 'react';
import { switchSection } from '../../actions';
import { connect } from 'react-redux';

function select(state) {
  return {
    game: state.game,
    players: state.players,
    user: state.user
  }
}

@connect(select)
export default class Input extends Component {
  renderSelector() {
    const {user, game} = this.props;
    const cur_section = user.cur_section;
    const var_ids = game.sections[cur_section].decleared_variables.input;
    var Options = [];
    for (let key in var_ids){
      const name = game.variables[var_ids[key]].name;
      const first = name ? (name.first ? name.first : '???') : '???';
      const middle = name ? (name.middle ? name.middle : '???') : '???';
      const last = name ? (name.last ? name.last : '???') : '???';
      Options.push(
        <div key={key}>
          {var_ids[key]}:{first}/{middle}/{last}
        </div>
      );
    }
    return (
      <div style={style.selector}>{Options}</div>
    );
  }
  renderDisplay() {
    const {user, game} = this.props;
    const cur_section = user.cur_section;
    const dec_vs = game.sections[cur_section].decleared_variables.input;

    var Values = [];
    for (let i = 0; i < Object.keys(dec_vs).length; i++){
      if (dec_vs.hasOwnProperty(i)){
        let value = game.variables[dec_vs[i]].value ? game.variables[dec_vs[i]].value : 'null';
        Values.push(<div style={style.item} key={i}>{value}</div>);
      } else {
        Values.push(<div style={style.item} key={i}>-</div>);
      }
    }    
    return (
      <div style={style.display}>{Values}</div>
    );
  }
  render() {
    const {game, user} = this.props;
    const Selector = this.renderSelector();
    const Display = this.renderDisplay();
    return (
      <div style={style.base}>
        {Display}
        <div style={style.label_wrap}>INPUT</div>
        {Selector}
        <div style={{clear:'both'}}></div>
      </div>
    );    
  }
}

Input.propTypes = {
}


const style = {
  base: {
    border: '1px solid black',
    minHeight: '100px',
    display: 'table-row'
  },
  label_wrap:{
    border: '1px solid black',
    display: 'table-cell',
    width: '100px'
  },    
  label: {
    border: '1px solid black',
    borderRadius: '50%',
    lineHeight: '100px',
    textAlign: 'center',
    width: '100px',
    height: '100px',
    float: 'left',
//    display: 'table-cell',
  },
  selector: {
    border: '1px solid black',
    width: '35%',
//    float: 'right',
    display: 'table-cell',
  },
  display: {
    border: '1px solid black',
    width: '10%',
//    float: 'left',
    display: 'table-cell',
  },
}