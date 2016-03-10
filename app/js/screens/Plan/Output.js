import React, { Component, PropTypes } from 'react';
import { selectAnswer, assignPlayer, enableNextScreen, setOutputNumber } from '../../actions';
import { connect } from 'react-redux';

function select(state) {
  return {
    game: state.game,
    players: state.players,
  }
}

@connect(select)
export default class Output extends Component {
  setOutputNumber(event){
    const {dispatch, section_index} = this.props;
    const num_outputs = parseInt(event.target.value);
    dispatch(setOutputNumber(section_index, num_outputs));
  }
  render() {
    const {section_index, game} = this.props;
    const output_num = game.sections[section_index].num_outputs;
    
    var arrow_style = null;
    if (output_num == 0){
      arrow_style = {opacity:'0.2'};
    }    
    
    return (
      <div style={style.base}>
        <select 
          onChange={this.setOutputNumber.bind(this)}
          value={output_num}>
          <option value='0' key='0'>0</option>
          <option value='1' key='1'>1</option>
          <option value='2' key='2'>2</option>
          <option value='3' key='3'>3</option>
          <option value='4' key='4'>4</option>
          <option value='5' key='5'>5</option>
          <option value='6' key='6'>6</option>
        </select>
        <div style={arrow_style}>&#8681;</div>
      </div>
    )
  }
}

Output.propTypes = {
  section_index: PropTypes.number.isRequired
}


const style = {
  base: {
    textAlign: 'center',
    fontSize: '40px'
  },
}