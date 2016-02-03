import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
//import { addTodo, completeTodo, setVisibilityFilter, goNextScreen, goPreviousScreen, VisibilityFilters } from '../actions'
import { goNextScreen, goPreviousScreen } from '../actions'
//import AddTodo from '../components/AddTodo'
//import TodoList from '../components/TodoList'
//import Footer from '../components/Footer'
  
  
class App extends Component {
  render() {
    // Injected by connect() call:
//    const { dispatch, visibleTodos, visibilityFilter, gameScreen } = this.props
    const { dispatch, gameScreen } = this.props
    return (
      <div>
        <button onClick={()=>dispatch(goPreviousScreen(gameScreen))}>Go Previous</button>
        <button onClick={()=>dispatch(goNextScreen(gameScreen))}>Go Next</button>
        {gameScreen}
      </div>
    )
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

//function selectTodos(todos, filter) {
//  switch (filter) {
//    case VisibilityFilters.SHOW_ALL:
//      return todos
//    case VisibilityFilters.SHOW_COMPLETED:
//      return todos.filter(todo => todo.completed)
//    case VisibilityFilters.SHOW_ACTIVE:
//      return todos.filter(todo => !todo.completed)
//  }
//}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return {
//    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
//    visibilityFilter: state.visibilityFilter,
    gameScreen: state.gameScreens
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App)