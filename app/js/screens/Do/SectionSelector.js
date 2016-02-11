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
export default class SectionSelector extends Component {
//  assignPlayer(event){
//    const {dispatch, index} = this.props;
////    console.log('assignPlayer');
////    console.log(event.target.value);
//    dispatch(assignPlayer(
//      index, 
//      parseInt(event.target.value)
//    ));
//  }
  switchSection(){
//    const {dispatch} = this.props;
//    dispatch(switchSection());
  }
  renderSections(){
    const {index, players, game} = this.props;
    const that = this;
      
    const Sections = game.sections.map(section=>(
      <div>
        <button onClick={that.switchSection.bind(that)}>
          {section.order}
        </button>
      </div>
    ));
    
    return Sections;
  }
  render() {
    const {index, game} = this.props;
    const Sections = this.renderSections();
    return (
      <div>
        {Sections}
      </div>
    )
  }
}

SectionSelector.propTypes = {
}



const style = {
  sections: {
    top: '100px',
    left: '50px',
  },
}