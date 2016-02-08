import React, { Component, PropTypes } from 'react';
import { openEnvelop, enableNextScreen } from '../actions';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';

class Intro extends Component {
  vaildateWork() {
    
  }
  handleClick() {
    this.props.dispatch(openEnvelop());
    this.props.dispatch(enableNextScreen());
  }
  renderContext() {
    const { intro } = this.props;
    
    if (intro.is_envelop_opened){
      return (
        <p>{intro.message}</p>
      );
    } else {
      return (
        <button onClick={this.handleClick.bind(this)}>Open Envelop</button>
      );
    }
  }
  render() {
    const Context = this.renderContext();
    return (
      <div>
        {Context}
      </div>
    )
  }
}

Intro.propTypes = {
}

const style = {
}


function select(state) {
  return {
    intro: state.intro,
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Intro)