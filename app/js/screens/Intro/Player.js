import React, { Component, PropTypes } from 'react';
import { voteLeader } from '../../actions';
import { connect } from 'react-redux';

class Player extends Component {
  handleClick() {
    const {dispatch, uid} = this.props;
    dispatch(voteLeader(uid));
  }
  render() {
    const {players, uid} = this.props;
    const VoteIcon = players[uid].is_leader ? 
          <img style={style.vote_img} src='./app/img/vote.png'/> : 
          <div style={style.vote_check}
            onClick={this.handleClick.bind(this)}>
          </div>;
    return (
      <div style={{...style.cell, ...style.base}}>
        <div>
          <img style={style.user_img} src='./app/img/user.png'/>
        </div>
        {players[uid].name}
        <div>
          {VoteIcon}
        </div>
      </div>
    )
  }
}

//<div style={style.base}>
//  <div><img style={{...style.user_img, ...user_img_style}} src='./app/img/user.png'/></div>
//  {PlayerSelector}
//</div>

Player.propTypes = {
}

const style = {
  base: {
    textAlign: 'center',
  },
  cell: {
    display: 'table-cell'
  },
  user_img: {
    width: '40px',
    height: '40px',
  },
  vote_img: {
    width: '20px',
    height: '20px',
  },
  vote_check: {
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    border: '1px solid black',
    marginLeft: 'auto',
    marginRight: 'auto',
    cursor: 'pointer'
  }
}

function select(state) {
  return {
    players: state.players,
    user: state.user,
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Player)