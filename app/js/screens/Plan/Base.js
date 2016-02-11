import React, { Component, PropTypes } from 'react';
import { selectAnswer, assignPlayer, enableNextScreen } from '../../actions';
import { connect } from 'react-redux';
import Section from './Section';

function select(state) {
  return {
    game: state.game,
    players: state.players,
  }
}
@connect(select)
export default class Plan extends Component {
//  selectAnswer(event){
//    console.log('selectAnswer');
//    console.log(event.target.value);
//    this.props.dispatch(selectAnswer());
//  }
//  assignPlayer(event){
//    console.log('assignPlayer');
//    console.log(event.target.value);
//    
//  }
  renderSections(){
    const {game, players} = this.props;
    const that = this;
    
    var Sections = [];
    for (let i = 0; i < game.sections.length; i++){
      Sections[game.sections[i].order] = (
        <Section key={i} index={game.sections[i].index}/>
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