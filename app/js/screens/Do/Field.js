import React, { Component, PropTypes } from 'react';
import { switchSection } from '../../actions';
import { connect } from 'react-redux';

function select(state) {
  return {
    game: state.game,
    players: state.players,
    user: state.user
  }
}

@connect(select)
export default class Field extends Component {
  renderInput() {
    return (
      <div>
        Input
      </div>
    );
  }
  renderQuestion() {
    return (
      <div>
        estion
      </div>
    );
  }
  renderOperation() {
    return (
      <div>
        ration
      </div>
    );
  }
  renderResult() {
    return (
      <div>
        Result
      </div>
    );
  }
  renderOutput() {
    return (
      <div>
        Output
      </div>
    );
  }
  render() {
    const {game, user, field_type} = this.props;
    var FieldComponent = null;
    switch (field_type){
      case 'input':
        FieldComponent = this.renderInput();
        break;
      case 'question':
        FieldComponent = this.renderQuestion();
        break;
      case 'operation':
        FieldComponent = this.renderOperation();
        break;
      case 'result':
        FieldComponent = this.renderResult();
        break;
      case 'output':
        FieldComponent = this.renderOutput();
        break;
      default:
        
    }
    return (
      {FieldComponent}
    );    
  }
}

Field.propTypes = {
}


const style = {
  base: {
    border: '1px solid black',
    minHeight: '100px'
  },
}