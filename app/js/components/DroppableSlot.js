import React, { Component, PropTypes } from 'react';
import { DNDTYPE, dropParagraph } from '../actions';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';

const squareTarget = {
  drop(props, monitor) {
    const payload = {
      paragraph: monitor.getItem().paragraph,
      index: props.index
    }
    props.dispatch(dropParagraph(payload));
    props.validateWork();
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

@connect()
@DropTarget(DNDTYPE.DROPPABLE_SLOT, squareTarget, collect)
export default class DroppableSlot extends Component {
  render() {
    const { paragraph, connectDropTarget, isOver, dispatch } = this.props;
    const backgroundColor = isOver ? 'yellow': null;
    const that = this;
    return connectDropTarget(
      <div style={{...style.base, backgroundColor}}>
        <p style={style.text}>{paragraph}</p>
      </div>
    )
  }
}

DroppableSlot.propTypes = {
  index: PropTypes.number.isRequired,
  validateWork: PropTypes.func.isRequired,
  paragraph: PropTypes.string.isRequired
}

const style = {
  base: {
    width: '100px',
    height: '25px',
    border: '1px solid black'
  },
  text: {
    margin: '0px'
  }
}

