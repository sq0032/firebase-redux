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
export default class SectionButton extends Component {
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
    const {dispatch, section_index} = this.props;
    console.log('switchSection');
    dispatch(switchSection(section_index));
  }
  renderSections(){
    const {players, game} = this.props;
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
    const {order, section_index, game, user} = this.props;
    const backgroundColor = (user.cur_section == section_index) ? 'yellow' : null;
//    const Sections = this.renderSections();
    return (
      <div 
        onClick={this.switchSection.bind(this)}
        style={{...style.base, backgroundColor}}>
        {order}
      </div>
    )
  }
}

SectionButton.propTypes = {
}



const style = {
  base: {
    height: '75px',
    width: '75px',
    borderRadius: '50%',
    border: '1px solid black',
    textAlign: 'center',
    lineHeight: '75px',
    fontSize: '200%',
    marginBottom: '50px',
    cursor: 'pointer'
  },
}