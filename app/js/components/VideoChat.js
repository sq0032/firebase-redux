import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default class VideoChat extends Component {
  render() {
    return (
      <div style={style.base}>
        <iframe
          style={style.video}
          src="https://appear.in/tyunbhiuhguvfhdshui234587kv" 
          frameBorder="1"></iframe>
      </div>
    )
  }
}

VideoChat.propTypes = {
//  onClick: PropTypes.func.isRequired,
//  text: PropTypes.string.isRequired,
//  completed: PropTypesgameScreen: state.gameScreens,.bool.isRequired
}

const style = {
  base: {
//    left:'0px',
    width: '200px',
    right:'0px',
    top:'100px',
    bottom:'0px',
//    height:'100px',
    position: 'absolute'
  },
  video: {
    height: '100%',
    width: '100%'
  }
}



function select(state) {
  return {
    user: state.user,
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(VideoChat)