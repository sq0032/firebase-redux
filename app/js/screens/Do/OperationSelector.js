import React, { Component, PropTypes } from 'react';
import { selectOperation } from '../../actions';
import { connect } from 'react-redux';

function select(state) {
  return {
    game: state.game,
    players: state.players,
    user: state.user
  }
}

@connect(select)
export default class OperationSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_selector_hover: false
    };
  }
  handleSelectOperation(e) {
    const {dispatch, user} = this.props;
    const section_id = user.cur_section;
    const operation = parseInt(e.target.value);
    dispatch(selectOperation(section_id, operation));
  }
  renderOptions() {
    const {user, game} = this.props;
    const operations = game.operations;
    var Options = [];
//        name: OPERATIONTYPE.ADDITION,
//        description: 'The addition of two whole numbers is the total amount of those quantities combined.',
//        symbol: '+'    
    Options.push(
        <option value={'default'} disabled key={'default'}></option>
    );    
    for(let key in operations){
      let name = game.operations[key].name;
      let symbol = game.operations[key].symbol;
      Options.push(
        <option value={key} key={key}>{symbol}</option>
      );
    }
    return Options;
  }
  renderSelector() {
    const {user, game} = this.props;
    const section_id = user.cur_section;
    const operation = game.sections[section_id].operation;
    const Options = this.renderOptions();
    return (
      <select 
        style={style.select} 
        onChange={this.handleSelectOperation.bind(this)} 
        value={operation != null ? operation : 'default'}>
          {Options}
      </select>
    );
  }  
  render() {
    const {game, user} = this.props;
    const Selector = this.renderSelector();
    return (
      <div style={style.select}>
        {Selector}
      </div>
    );
  }
}

OperationSelector.propTypes = {
}


const style = {
  base: {
//   background: 'url(http://i62.tinypic.com/15xvbd5.png) no-repeat 96% 0',
//   height: '29px',
//   overflow: 'hidden',
////   width: '240px',
//                   
//   backgroundColor: 'rgb(239, 235, 171)',
//   borderBottom: '1px solid black',
  },
  select: {
//   background: 'transparent',
   border: 'none',
   fontSize: '40px',
//   height: '29px',
   padding: '5px',
//   width: '268px',
   cursor: 'pointer'
  }  

}