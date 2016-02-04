import { combineReducers } from 'redux'
import { TYPE, GameScreens } from './actions'

const intro_init = {
  message: 'this is intro message'
};
  
function intro(state = intro_init, action){
  switch (action.type) {
    default:
      return state
  }
}
  
function gameScreens(state = 0, action){
  switch (action.type) {
    case TYPE.GO_NEXT_SCREEN:
      console.log('GO_NEXT_SCREEN');
      console.log(action.cur_screen);
      if(action.cur_screen<GameScreens.length-1){
        return action.cur_screen+1;
      }else{
        return state
      }
    case TYPE.GO_PREVIOUS_SCREEN:
      console.log('GO_PREVIOUS_SCREEN');
      console.log(action.cur_screen);
      if(action.cur_screen>0){
        return action.cur_screen-1;
      }else{
        return state
      }      
    default:
      return state
  }
}

const todoApp = combineReducers({
  gameScreens,
  intro
})

export default todoApp