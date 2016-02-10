import React, { Component, PropTypes } from 'react';
import { DNDTYPE, dropParagraph } from '../actions';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';

const squareTarget = {
  drop(props, monitor) {
    const payload = {
      paragraph: monitor.getItem().paragraph,
      index: monitor.getItem().index,
      order: props.order,
    }
    props.dispatch(dropParagraph(payload));
    props.validateWork();
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

@connect()
@DropTarget(DNDTYPE.DROPPABLE_SLOT, squareTarget, collect)
export default class DroppableSlot extends Component {
  render() {
    const { paragraph, connectDropTarget, canDrop, isOver, dispatch } = this.props;
    var backgroundColor = canDrop ? 'gray': null;
    backgroundColor = isOver ? 'yellow': backgroundColor;
    const that = this;
    return connectDropTarget(
      <div style={{...style.base, backgroundColor}}>
        <p style={style.text}>{paragraph}</p>
      </div>
    )
  }
}

DroppableSlot.propTypes = {
  validateWork: PropTypes.func.isRequired,
  paragraph: PropTypes.string.isRequired
}

const style = {
  base: {
    width: '300px',
    minHeight: '125px',
    border: '1px solid black',
  },
  text: {
    margin: '0px'
  }
}

