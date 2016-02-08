import React, { Component, PropTypes } from 'react';
import { openEnvelop, enableNextScreen } from '../actions';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import DragableParagraph from '../components/DragableParagraph';
import DroppableSlot from '../components/DroppableSlot';

function select(state) {
  return {
    read: state.read,
    game: state.game,
  }
}

@connect(select)
@DragDropContext(HTML5Backend)
export default class Read extends Component {
  validateWork() {
    const {game, read, dispatch} = this.props;
    const num_filled_slots = read.slots.filter(
      s=>typeof(s)!='undefined'
    ).length
    
    if (game.paragraphes.length == num_filled_slots){
      dispatch(enableNextScreen());
    }
  }
  renderSlots() {
    const {game, read} = this.props;
    const validateWork = this.validateWork.bind(this);
    return game.paragraphes.map((paragraph, index)=>{
      if (!read.slots[index]){
        return (
          <DroppableSlot 
            key={index} 
            index={index}
            validateWork={validateWork}
            paragraph='Drop Here'/>
        )
      } else {
        return (
          <DroppableSlot 
            key={index} 
            index={index}
            validateWork={validateWork}
            paragraph={read.slots[index]}/>
        );
      }
    });
  }
  renderParagraphes() {
    const {game} = this.props;
    return game.paragraphes.map((paragraph, index)=>{
      return (
        <DragableParagraph key={index} paragraph={paragraph}/>
      );
    });
  }
  render() {
    const Paragraphes = this.renderParagraphes();
    const Slots = this.renderSlots();
    return (
      <div>
        {Paragraphes}
        {Slots}
      </div>
    )
  }
}

Read.propTypes = {
}

const style = {
}



// Wrap the component to inject dispatch and state into it
//export default connect(select)(Read)