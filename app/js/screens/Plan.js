import React, { Component, PropTypes } from 'react';
import { selectAnswer, assignPlayer, enableNextScreen } from '../actions';
import { connect } from 'react-redux';

function select(state) {
  return {
    game: state.game,
    players: state.players,
  }
}
@connect(select)
export default class Plan extends Component {
  selectAnswer(event){
    console.log('selectAnswer');
    console.log(event.target.value);
    this.props.dispatch(selectAnswer());
  }
  assignPlayer(event){
    console.log('assignPlayer');
    console.log(event.target.value);
  }
  renderSections(){
    const {game, players} = this.props;
    const that = this;
    
    var AnswerOptions = game.answers.map(answer=>(
      <option key={answer.index} value={answer.index}>{answer.text}</option>
    ));
    AnswerOptions = [
      (<option key={0} value="select">Select an resonable answer</option>),
      AnswerOptions
    ];
       
    var PlayerOptions = players.map(player=>(
      <option key={player.id} value={player.id}>{player.name}</option>
    ));
    PlayerOptions = [
      (<option key={0} value="select">Select an player</option>),
      PlayerOptions
    ];
    
    var Sections = [];
    for (let i = 0; i < game.sections.length; i++){
      Sections[game.sections[i].order] = (
        <div key={i}>
          <p>{game.sections[i].text}</p>
          <label>Answer:</label>
          <select value="select" onChange={this.selectAnswer.bind(this)}>{AnswerOptions}</select>
          <br/>
          <label>Player:</label>
          <select value="select" onChange={this.assignPlayer.bind(this)}>{PlayerOptions}</select>
          <br/>
        </div>
      );
    }
    return Sections;
  }
  render() {
    const Sections = this.renderSections();
    return (
      <div>
        <div>
          {Sections}
        </div>
      </div>
    )
  }
}

Plan.propTypes = {
}



const style = {
  sections: {
    top: '100px',
    left: '50px',
  },
}