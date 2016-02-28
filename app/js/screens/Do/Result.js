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
export default class Result extends Component {
  renderSelector() {
    const {user, game} = this.props;
    const cur_section = user.cur_section;
    const var_ids = game.sections[cur_section].default_variables.result;
    var Options = [];
    for (let key in var_ids){
      const name = game.variables[var_ids[key]].name;
      let first = name ? (name.first ? name.first : '???') : '???';
      let middle = name ? (name.middle ? name.middle : '???') : '???';
      let last = name ? (name.last ? name.last : '???') : '???';      
      Options.push(
        <div key={var_ids[key]}>
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
    const dec_vs = game.sections[cur_section].default_variables.result;
    var Values = [];
    for (let i = 0; i < 6; i++){
      if (dec_vs.hasOwnProperty(i)){
        let value = game.variables[dec_vs[i]].value ? game.variables[dec_vs[i]].value : 'null';
        Values.push(<div style={style.item} key={i}>vid:{dec_vs[i]}, value:{value}</div>);
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
        <div style={style.label_wrap}>
          <div style={style.label}>RESULT</div>
        </div>
        {Selector}
        <div style={{clear:'both'}}></div>
      </div>
    );
  }
}

Result.propTypes = {
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
  label: {
    border: '1px solid black',
    borderRadius: '50%',
    lineHeight: '100px',
    textAlign: 'center',
    width: '100px',
    height: '100px',
    display: 'inline-block'
  },
}