import { combineReducers } from 'redux'
import { TYPE, GameScreens } from './actions'


function gameScreens(state = GameScreens[0], action){
  const screen_index = GameScreens.indexOf(action.cur_screen);
  switch (action.type) {
    case TYPE.GO_NEXT_SCREEN:
      console.log('GO_NEXT_SCREEN');
      console.log(screen_index);
      if(screen_index<GameScreens.length-1){
        return GameScreens[screen_index+1];
      }else{
        return state
      }
    case TYPE.GO_PREVIOUS_SCREEN:
      console.log('GO_PREVIOUS_SCREEN');
      console.log(screen_index);
      if(screen_index>0){
        return GameScreens[screen_index-1];
      }else{
        return state
      }      
    default:
      return state
  }
}

const todoApp = combineReducers({
  gameScreens
})

export default todoApp