import React, { Component, PropTypes } from 'react';
import { enableNextScreen } from '../../actions';
import { connect } from 'react-redux';

import SectionButton from './SectionButton';

function select(state) {
  return {
    game: state.game,
    user: state.user,
  }
}

@connect(select)
export default class Do extends Component {
  renderSectionButtons(){
    const {game} = this.props;
    const SectionButtons = game.sections.sort(
      (a,b)=>(a.order-b.order)
    ).map((section, index)=>{
      return (
        <SectionButton key={index} index={index} section_index={section.index} />
      );
    });
    
    return SectionButtons;
  }
  renderSection(){
    const {game, user} = this.props;
    return (
      <div>{game.sections[user.cur_section].text}</div>
    );
  }
  render() {
    const SectionButtons = this.renderSectionButtons();
    const Section = this.renderSection();
    return (
      <div>
        <div style={style.section_buttons}>
          {SectionButtons}
        </div>
        <div style={style.section}>
          {Section}
        </div>
      </div>
    )
  }
}

Do.propTypes = {
}

const style = {
  section: {
    position: 'absolute',
    top: '50px',
    left: '150px',
    right: '20px',
    border: '1px solid black',
  }
}