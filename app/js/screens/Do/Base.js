import React, { Component, PropTypes } from 'react';
import { enableNextScreen } from '../../actions';
import { connect } from 'react-redux';

import SectionSelector from './SectionSelector';

function select(state) {
  return {
    game: state.game,
    user: state.user,
  }
}

@connect(select)
export default class Do extends Component {
  render() {
    return (
      <div>
        <SectionSelector />
      </div>
    )
  }
}

Do.propTypes = {
  
}

const style = {
  
}