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
    
    if (game.sections.length == num_filled_slots){
      dispatch(enableNextScreen());
    }
  }
  renderSlots() {
    const {game, read} = this.props;
    const validateWork = this.validateWork.bind(this);
    var Slots = [];
    for (let i = 0; i < game.sections.length; i++){
      const section = game.sections.filter(section => section.order == i);
      if (section.length != 0){
        Slots[i] = (
          <DroppableSlot
            key={i}
            order={i}
            validateWork={validateWork}
            paragraph={section[0].text}/>
        );
      } else {
        Slots[i] = (
          <DroppableSlot
            key={i} 
            order={i}
            validateWork={validateWork}
            paragraph='Drop Here'/>
        )
      }
    }
    return Slots;
  }
  renderParagraphes() {
    const {game} = this.props;
    return game.sections.map((section, index)=>{
      const is_ordered = section.order == null ? false : true;
      return (
        <DragableParagraph key={index} is_ordered={is_ordered} index={section.index} paragraph={section.text}/>
      );
    });
  }
  render() {
    const Paragraphes = this.renderParagraphes();
    const Slots = this.renderSlots();
    return (
      <div>
        <div style={style.paragraphes}>
          {Paragraphes}
        </div>
        <div style={style.slots}>
          {Slots}
        </div>
      </div>
    )
  }
}

Read.propTypes = {
}

const style = {
  paragraphes: {
//    position: 'absolute',
    top: '100px',
    left: '50px',
  },
  slots: {
//    position: 'absolute',
    top: '100px',
    right: '50px',
  }
}



// Wrap the component to inject dispatch and state into it
//export default connect(select)(Read)