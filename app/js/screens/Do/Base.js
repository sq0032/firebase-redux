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
    const SectionButtons = [];
    for (let i = 0; i < game.sections.length; i++){
      const section = game.sections.filter(s => s.order == i)[0]
      SectionButtons.push(
        <SectionButton key={i} order={i} section_index={section.index} />
      );
    }
    return SectionButtons;
  }
  render() {
    const SectionButtons = this.renderSectionButtons();
    return (
      <div style={style.base}>
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
  base: {
    position: 'relative',
    width: '1024px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  section: {
    position: 'absolute',
    top: '120px',
    left: '0px',
    right: '0px',
    border: '1px solid black',
  },
  section_buttons :{
    textAlign: 'center',
//    position: 'absolute',
  }
}