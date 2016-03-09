import React, { Component, PropTypes } from 'react';
import { enableNextScreen } from '../../actions';
import { connect } from 'react-redux';

import SectionButton from './SectionButton';
import Board from './Board';

function select(state) {
  return {
    game: state.game,
    user: state.user,
    players: state.players
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
    const {game, user, players} = this.props;
    console.log(user);
    const player_id = game.sections[user.cur_section].player;
    const player = (player_id != null) ? players[player_id].name : 'No one plays it';
    const SectionButtons = this.renderSectionButtons();
    
    var user_img_style = null;
    if (player_id == null){
      user_img_style = {opacity:'0.2'};
    } else if (player_id == user.uid) {
      user_img_style = {opacity:'1'};
    }
    
    return (
      <div style={style.base}>
        <div style={style.section_buttons}>
          {SectionButtons}
        </div>
        <img style={{...style.user_img, ...user_img_style}} src='./app/img/user.png'/>
        <div>{player}</div>
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
  user_img: {
    width: '40px',
    height: '40px',
  },
  section: {
//    position: 'absolute',
//    top: '120px',
//    left: '0px',
//    right: '0px',
    width: '1024px',
    marginLeft: 'auto',
    marginRight: 'auto',
    border: '1px solid black',
  },
  section_buttons :{
    textAlign: 'center',
//    position: 'absolute',
  }
}