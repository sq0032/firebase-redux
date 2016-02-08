import React, { Component, PropTypes } from 'react';
import { DNDTYPE } from '../actions';
import { DragSource } from 'react-dnd';

const knightSource = {
  beginDrag(props) {
    return {
      paragraph: props.paragraph
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

@DragSource(DNDTYPE.DROPPABLE_SLOT, knightSource, collect)
export default class DragableParagraph extends Component {
  render() {
    const { connectDragSource, isDragging, dispatch } = this.props;
    return connectDragSource(
      <p style={style.text}>
        {this.props.paragraph}
      </p>
    )
  }
}

DragableParagraph.propTypes = {
//  onClick: PropTypes.func.isRequired,
//  text: PropTypes.string.isRequired,
//  completed: PropTypesgameScreen: state.gameScreens,.bool.isRequired
}

const style = {
}

