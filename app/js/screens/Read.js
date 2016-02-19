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
    const {game, dispatch} = this.props;
    const num_unfilled_slots = game.sections.filter(
      s => s.order == null
    ).length
    
    if (num_unfilled_slots == 0){
      dispatch(enableNextScreen());
    }
  }
  renderSlots() {
    const {game} = this.props;
    const validateWork = this.validateWork.bind(this);
    var Slots = [];
    for (let i = 0; i < game.sections.length; i++){
      const section = game.sections.filter(section => section.order == i);
      const section_index = (section.length == 0) ? null : parseInt(section[0].index);
      Slots[i] = (
        <DroppableSlot
          key={i}
          order={i}
          section_index={section_index}
          validateWork={validateWork}/>
      );
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
    position: 'absolute',
    top: '100px',
    left: '50px',
  },
  slots: {
    position: 'absolute',
    top: '100px',
    left: '450px',
  }
}



// Wrap the component to inject dispatch and state into it
//export default connect(select)(Read)