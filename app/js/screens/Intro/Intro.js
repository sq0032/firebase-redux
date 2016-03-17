import React, { Component, PropTypes } from 'react';
import { openEnvelop, enableNextScreen } from '../../actions';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';

import Players from './Players';

class Intro extends Component {
  vaildateWork() {
    
  }
  handleClick() {
    this.props.dispatch(openEnvelop());
    this.props.dispatch(enableNextScreen());
  }
  renderContent() {
    const { intro, game } = this.props;
    
    if (intro.is_envelop_opened){
      const section_statements = game.sections.map((section, index)=> {
        return (
          <p key={index}>{section.text}</p>
        );
      });
      return (
        <div style={{textAlign:'left'}}>
          <p>{intro.message}</p>
          <p>{game.statement}</p>
          {section_statements}
        </div>
      );
    } else {
      return (
        <img 
          style={style.envelop_img} 
          src='./app/img/envelope-close.png'
          onClick={this.handleClick.bind(this)}
        />
      );
    }
  }
  render() {
    const Content = this.renderContent();
    return (
      <div>
        <div style={style.content}>
          {Content}
        </div>
        <div style={style.players}>
          <h3>Vote for leader</h3>
          <Players />
        </div>
      </div>
    )
  }
}

Intro.propTypes = {
}

const style = {
  players: {
//    position: 'absolute',
    width: '80%',
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
    bottom: '50px',
    textAlign: 'center'
  },
  content: {
    width: '80%',
    maxWidth: '800px',
    textAlign: 'center',
    minHeight: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  envelop_img: {
    width: '50%',
    maxWidth: '300px',
    cursor: 'pointer'
  }
}


function select(state) {
  return {
    intro: state.intro,
    players: state.players,
    user: state.user,
    game: state.game
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Intro)