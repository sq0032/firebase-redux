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
export default class Player extends Component {
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
    dispatch(setOutputNumber(section_index, num_outputs));
  }
  renderPlayerSelector(){
    const {section_index, players, game} = this.props;
    const that = this;
    var PlayerOptions = [];
    for(let id in players){
      PlayerOptions.push(
        <option key={id} value={id}>{players[id].name}</option>
      );
    }
    PlayerOptions = [
      (<option key="select" value="select" disabled>-</option>),
      PlayerOptions
    ];
    
    const player_id = game.sections[section_index].player;
    return (
      <select 
        value={(player_id == null) ? "select" : player_id}
        onChange={this.assignPlayer.bind(this)}>
        {PlayerOptions}
      </select>
    );
  }
  render() {
    const {section_index, game} = this.props;
    const PlayerSelector = this.renderPlayerSelector();
    const player_id = game.sections[section_index].player;
    var user_img_style = null;
    if (player_id == null){
      user_img_style = {opacity:'0.2'};
    }
    return (
      <div style={style.base}>
        <div><img style={{...style.user_img, ...user_img_style}} src='./app/img/user.png'/></div>
        {PlayerSelector}
      </div>
    )
  }
}

Player.propTypes = {
  section_index: PropTypes.number.isRequired
}


const style = {
  base: {
    textAlign: 'center',
  },
  user_img: {
    width: '40px',
    height: '40px',
  },
}