import React, { Component, PropTypes } from 'react';
import { openEnvelop, enableNextScreen } from '../../actions';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import DragableParagraph from './DragableParagraph';
import DroppableSlot from './DroppableSlot';

function select(state) {
  return {
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
        <div style={style.row} key={i}>
          <div style={style.cell}>
            <div style={style.label}>
              {i+1}
            </div>
          </div>
          <div style={style.cell}>
            <DroppableSlot
              order={i}
              section_index={section_index}
              validateWork={validateWork}/>
          </div>
        </div>
      );
    }
    
    return (
      <div style={style.sub_table}>
        {Slots}
      </div>
    );
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
      <div style={style.table}>
        <div style={style.row}>
          <div style={style.cell}>
            {Paragraphes}
          </div>
          <div style={style.cell}>
            {Slots}
          </div>
        </div>
      </div>
    )
  }
}

Read.propTypes = {
}

const style = {
  table: {
    border: '1px solid red',
    display: 'table',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  sub_table:{
    display: 'table',
  },
  row: {
    display: 'table-row'
  },
  cell:{
    display: 'table-cell',
    verticalAlign: 'middle',
//    border: '50px solid transparent'
  },
  paragraphes: {
//    position: 'absolute',
    top: '100px',
    left: '50px',
  },
  slots: {
//    position: 'absolute',
    top: '100px',
    left: '450px',
  },
  label: {
    height: '75px',
    width: '75px',
    borderRadius: '50%',
    border: '1px solid black',
    margin: '0px 10px 0px 10px',
    textAlign: 'center',
    lineHeight: '75px',
    fontSize: '200%',
//    cursor: 'pointer',
//    display: 'inline-block'
  }  
}



// Wrap the component to inject dispatch and state into it
//export default connect(select)(Read)