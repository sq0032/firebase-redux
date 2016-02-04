import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Intro extends Component {
  render() {
    return (
      <div>
        {this.props.intro.message}
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