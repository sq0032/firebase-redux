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
export default class Section extends Component {
  selectAnswer(event){
    const {dispatch, index} = this.props;
    dispatch(selectAnswer(
      index,
      parseInt(event.target.value)
    ));
  }
  assignPlayer(event){
    const {dispatch, index} = this.props;
//    console.log('assignPlayer');
//    console.log(event.target.value);
    dispatch(assignPlayer(
      index, 
      parseInt(event.target.value)
    ));
  }
  setOutputNumber(event){
    const {dispatch, index} = this.props;
    dispatch(setOutputNumber(index, parseInt(event.target.value)));
  }
  renderAnswerSelector(){
    const {index, game} = this.props;
    const that = this;
    
    var AnswerOptions = game.answers.map(answer=>(
      <option key={answer.index} value={answer.index}>{answer.text}</option>
    ));
    AnswerOptions = [
      (<option key={0} value="select">Select an resonable answer</option>),
      AnswerOptions
    ];
       
    return (
      <select 
        value={game.sections[index].answer}
        onChange={this.selectAnswer.bind(this)}>
        {AnswerOptions}
      </select>
    );
  }
  renderPlayerSelector(){
    const {index, players, game} = this.props;
    const that = this;
      
    var PlayerOptions = players.map(player=>(
      <option key={player.id} value={player.id}>{player.name}</option>
    ));
    PlayerOptions = [
      (<option key={0} value="select">Select an player</option>),
      PlayerOptions
    ];
    
    return (
      <select 
        value={game.sections[index].player}
        onChange={this.selectAnswer.bind(this)}>
        {PlayerOptions}
      </select>
    );
  }
  renderOutputSetter() {
    const {index, players, game} = this.props;
    const that = this;
    var NumberOptions = [];
    for (let i = 0; i <= game.config.max_num_outputs; i++){
      NumberOptions.push(
        <option key={i} value={i}>{i}</option>
      );
    }
    
    return (
      <select 
        value={game.sections[index].num_outputs}
        onChange={this.setOutputNumber.bind(this)}>
        {NumberOptions}
      </select>
    );
  }
  render() {
    const {index, game} = this.props;
    const AnswerSelector = this.renderAnswerSelector();
    const PlayerSelector = this.renderPlayerSelector();
    const OutputSetter = this.renderOutputSetter();
    return (
      <div>
        <p>{game.sections[index].text}</p>
        <label>Answer:</label>
          {AnswerSelector}
        <br/>
        <label>Player:</label>
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
}



const style = {
  sections: {
    top: '100px',
    left: '50px',
  },
}