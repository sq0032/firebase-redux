import React, { Component, PropTypes } from 'react';
import { selectAnswer, assignPlayer, enableNextScreen, setOutputNumber } from '../../actions';
import { connect } from 'react-redux';

import Player from './Player.js';
import Output from './Output.js';
//import Firebase from 'firebase';
//var rootRef = new Firebase('https://blazing-fire-2123.firebaseio.com');

function select(state) {
  return {
    game: state.game,
    players: state.players,
  }
}

@connect(select)
export default class Section extends Component {
  selectAnswer(event){
    const {dispatch, section_index} = this.props;
    dispatch(selectAnswer(
      section_index, 
      parseInt(event.target.value)
    ));
  }
  renderAnswerSelector(){
    const {section_index, game} = this.props;
    const that = this;
    
    var AnswerOptions = [];
    for (let key in game.answers){
      AnswerOptions.push(<option key={key} value={key}>{game.answers[key]}</option>);
      
    }
    AnswerOptions = [
      (<option key={0} value="select">Select an resonable answer</option>),
      AnswerOptions
    ];
       
    const section = game.sections.filter(s=>s.index==section_index)[0];
    return (
      <select 
        value={section.answer}
        onChange={this.selectAnswer.bind(this)}>
        {AnswerOptions}
      </select>
    );
  }
  render() {
    const {section_index, game} = this.props;
    const AnswerSelector = this.renderAnswerSelector();
    const section = game.sections[section_index];
    return (
      <div style={style.row}>
        <div style={style.cell}>
          <div 
            style={style.label}>
            {section.order+1}
          </div>
        </div>
        <div style={style.cell}>
          <p>{section.text}</p>
          <label>Answer:</label>
            {AnswerSelector}
        </div>
        <div style={style.cell}>
          <Output section_index={section_index}/>
        </div>
        <div style={style.cell}>
          <Player section_index={section_index}/>
        </div>
      </div>
    )
  }
}

Section.propTypes = {
  section_index: PropTypes.number.isRequired
}

const style = {
  cell: {
    display: 'table-cell',
    border: '10px solid transparent',
    verticalAlign: 'middle',
//    padding:' 20px'
  },
  row: {
//    minHeight: '210px',
//    width: '100%',
//    position: 'relative',
//    border: '5px solid black',
    display: 'table-row'
  },
  sections: {
    top: '100px',
    left: '50px',
  },
  user_img: {
    width: '40px',
    height: '40px',
  },
  label: {
    height: '75px',
    width: '75px',
    borderRadius: '50%',
    border: '1px solid black',
    margin: '0px 10px 0px 10px',
    textAlign: 'center',
    lineHeight: '75px',
    fontSize: '200%',
    cursor: 'pointer',
    display: 'inline-block'
  }
}