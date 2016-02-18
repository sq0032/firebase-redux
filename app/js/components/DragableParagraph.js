import React, { Component, PropTypes } from 'react';
import { DNDTYPE } from '../actions';
import { DragSource } from 'react-dnd';

const knightSource = {
  beginDrag(props) {
    return {
      paragraph: props.paragraph,
      index: props.index
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
    const opacity = this.props.is_ordered ? '0.5' : '1';
    return connectDragSource(
      <div style={style.base}>
        <p style={{...style.text, opacity}}>
          {this.props.paragraph}
        </p>
      </div>
    )
  }
}

DragableParagraph.propTypes = {
  paragraph: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  is_ordered: PropTypes.bool.isRequired,
}

const style = {
  base: {
    width: '300px',
    minHeight: '125px',
    border: '1px solid black',
    cursor: 'pointer'
  },
  text: {
    margin: '0px'
  }
}


