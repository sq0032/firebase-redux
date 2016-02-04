import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { goNextScreen, goPreviousScreen, GameScreens } from '../actions'

import Intro from '../screens/Intro';
import Read from '../screens/Read';
import Plan from '../screens/Plan';
import Do from '../screens/Do';
import Test from '../screens/Test';
import Screen from '../screens/Screen';

  
class App extends Component {
  
  renderScreen() {
    const offset = this.props.gameScreen;
    return (
      <div style={style.screen}>
        <Intro offset={-offset+0}/>
        <Read offset={-offset+1}/>
        <Plan offset={-offset+2}/>
        <Do offset={-offset+3}/>
        <Test offset={-offset+4}/>
      </div>
    );
  }
  render() {
    // Injected by connect() call:
//    const { dispatch, visibleTodos, visibilityFilter, gameScreen } = this.props
    const Screen = this.renderScreen();
    const { dispatch, gameScreen } = this.props
    return (
      <div>
        <button onClick={()=>dispatch(goPreviousScreen(gameScreen))}>Go Previous</button>
        <button onClick={()=>dispatch(goNextScreen(gameScreen))}>Go Next</button>
        <p>
          Screen Index:{gameScreen}, Screen Name:{GameScreens[gameScreen]}
        </p>
        {Screen}
      </div>
    )
  }
}

const style = {
  screen: {
    left:'0px',
    right:'1px',
    top:'100px',
    bottom: '0px',
    border: '1px solid black',
    position: 'absolute'
  }
}

App.propTypes = {
//  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
//    text: PropTypes.string.isRequired,
//    completed: PropTypes.bool.isRequired
//  }).isRequired).isRequired,
//  visibilityFilter: PropTypes.oneOf([
//    'SHOW_ALL',
//    'SHOW_COMPLETED',
//    'SHOW_ACTIVE'
//  ]).isRequired
}

function select(state) {
  return {
//    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
//    visibilityFilter: state.visibilityFilter,
    gameScreen: state.gameScreens,
    test: 'testttt'
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App)