import React, { Component, PropTypes } from 'react';
import { openEnvelop, enableNextScreen } from '../actions';
import { connect } from 'react-redux';

export default class Read extends Component {
  renderParagraphes() {
    const {game} = this.props;
    return game.paragraphes.map((paragraph, index)=>{
      return (
        <p key={index}>{paragraph}</p>
      );
    });
  }
  render() {
    const Paragraphes = this.renderParagraphes();
    return (
      <div>
        {Paragraphes}
      </div>
    )
  }
}

Read.propTypes = {
}

const style = {
}

function select(state) {
  return {
    read: state.read,
    game: state.game,
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Read)