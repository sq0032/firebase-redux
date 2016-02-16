import React, { Component, PropTypes } from 'react';
import { enableNextScreen } from '../../actions';
import { connect } from 'react-redux';

import SectionButton from './SectionButton';
import Board from './Board';

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
  render() {
    const SectionButtons = this.renderSectionButtons();
    return (
      <div>
        <div style={style.section_buttons}>
          {SectionButtons}
        </div>
        <div style={style.section}>
          <Board/>
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