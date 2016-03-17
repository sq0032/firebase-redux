import React, { Component, PropTypes } from 'react';
//import { openEnvelop, enableNextScreen } from '../../actions';
import { connect } from 'react-redux';

import Player from './Player'

class Players extends Component {
  renderPlayers() {
    const { players } = this.props;
    var Players = [];
    for (let uid in players){
      Players.push(
        <Player key={uid} uid={uid}/>
      );
    }
    return Players;
  }
  render() {
    const {players, uid} = this.props;
    const Players = this.renderPlayers();  
    return (
      <div style={style.table}>
        <div style={style.row}>
          {Players}
        </div>
      </div>
    )
  }
}

//<div style={style.base}>
//  <div><img style={{...style.user_img, ...user_img_style}} src='./app/img/user.png'/></div>
//  {PlayerSelector}
//</div>

Players.propTypes = {
}

const style = {
  base: {
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: '100%'
  },
  row: {
    display: 'table-row'
  },
  user_img: {
    width: '40px',
    height: '40px',
  },
}

function select(state) {
  return {
    players: state.players,
    user: state.user,
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Players)