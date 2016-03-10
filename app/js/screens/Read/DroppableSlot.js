import React, { Component, PropTypes } from 'react';
import { DNDTYPE, orderSection } from '../../actions';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';

const squareTarget = {
  drop(props, monitor) {
    const section_index = monitor.getItem().index;
    const section_order = props.order;
    props.dispatch(orderSection(section_index, section_order));
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

function select(state) {
  return {
    game: state.game
  }
}

@connect(select)
@DropTarget(DNDTYPE.DROPPABLE_SLOT, squareTarget, collect)
export default class DroppableSlot extends Component {
  render() {
    const { connectDropTarget, canDrop, isOver, dispatch, game, section_index } = this.props;
    var backgroundColor = canDrop ? 'gray': null;
    backgroundColor = isOver ? 'yellow': backgroundColor;
    const text = (section_index != null) ? game.sections[section_index].text : 'Drop Here';
    const that = this;
    return connectDropTarget(
      <div style={{...style.base, backgroundColor}}>
        <p style={style.text}>{text}</p>
      </div>
    )
  }
}

DroppableSlot.propTypes = {
  validateWork: PropTypes.func.isRequired,
  order: PropTypes.number,
  section_index: PropTypes.number
}

const style = {
  base: {
    minWidth: '150px',
    maxWidth: '300px',
    minHeight: '75px',
    border: '1px solid black',
    borderRadius: '10px',
    padding: '5px',
    margin: '5px'
  },
  text: {
    margin: '0px'
  }
}

