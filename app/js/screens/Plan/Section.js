import React, { Component, PropTypes } from 'react';
import { selectAnswer, assignPlayer, enableNextScreen, setOutputNumber } from '../../actions';
import { connect } from 'react-redux';
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
  assignPlayer(event){
    const {dispatch, section_index} = this.props;
    dispatch(assignPlayer(
      section_index, 
      parseInt(event.target.value)
    ));
  }
  setOutputNumber(event){
    const {dispatch, section_index} = this.props;
    const num_outputs = parseInt(event.target.value);
//    rootRef.child(`game/sections/${section_index}`).update({
//      num_outputs: num_outputs
//    }, error => {
//      if (error) {
//        dispatch(reportError('Set Output Number Error'));
//      } else {
//        dispatch(setOutputNumber(section_index, num_outputs));
//      }
//    });
    dispatch(setOutputNumber(section_index, num_outputs));
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
  renderPlayerSelector(){
    const {section_index, players, game} = this.props;
    const that = this;
      
//    var PlayerOptions = players.map(player=>(
//      <option key={player.id} value={player.id}>{player.name}</option>
//    ));
    var PlayerOptions = [];
    for(let id in players){
      PlayerOptions.push(
        <option key={id} value={id}>{players[id].name}</option>
      );
    }
    PlayerOptions = [
      (<option key="select" value="select">-</option>),
      PlayerOptions
    ];
    
    const section = game.sections.filter(s=>s.index==section_index)[0];
    return (
      <select 
        value={section.player}
        onChange={this.assignPlayer.bind(this)}>
        {PlayerOptions}
      </select>
    );
  }
  renderOutputSetter() {
    const {section_index, players, game} = this.props;
    const that = this;
    var NumberOptions = [];
    for (let i = 0; i <= game.config.max_num_outputs; i++){
      NumberOptions.push(
        <option key={i} value={i}>{i}</option>
      );
    }
    
    const section = game.sections.filter(s=>s.index==section_index)[0];
    return (
      <select 
        value={section.num_outputs}
        onChange={this.setOutputNumber.bind(this)}>
        {NumberOptions}
      </select>
    );
  }
  render() {
    const {section_index, game} = this.props;
    const AnswerSelector = this.renderAnswerSelector();
    const PlayerSelector = this.renderPlayerSelector();
    const OutputSetter = this.renderOutputSetter();
    const section = game.sections.filter(s=>s.index==section_index)[0];
    return (
      <div>
        <p>{section_index}:{section.text}</p>
        <label>Answer:</label>
          {AnswerSelector}
        <br/>
        <div><img style={style.user_img} src='./app/img/user.png'/></div>
        {PlayerSelector}
        <br/>
        <label>Number of Outputs:</label>
        {OutputSetter}
        <br/>
      </div>
    )
  }
}

Section.propTypes = {
  section_index: PropTypes.number.isRequired
}



const style = {
  sections: {
    top: '100px',
    left: '50px',
  },
  user_img: {
    width: '40px',
    height: '40px',
  },   
}