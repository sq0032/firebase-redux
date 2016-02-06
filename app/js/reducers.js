import { combineReducers } from 'redux'
import { TYPE, GameScreens } from './actions'

const intro_init = {
  message: 'this is intro message',
  is_envelop_opened: false,
  is_able_go_next: false,
  is_able_go_previous: false
};
  
function intro(state = intro_init, action){
  switch (action.type) {
    case TYPE.INTRO_OPEN_ENVELOP:
      return Object.assign({}, state, {is_envelop_opened:true});
    case TYPE.GO_NEXT_SCREEN:
      console.log('GO_NEXT_SCREEN on intro');
      return state
    default:
      return state
  }
}

const read_init = {
  slot: {}
}

function read(state = read_init, action){
  switch (action.type){
    case TYPE.DROP_PARAGRAPH:
      return state
    default:
      return state
  }
}

const game_init = {
//  paragraphes: {
//    1: "paragraph 1",
//    2: "paragraph 2",
//    3: "paragraph 3",
//    4: "paragraph 4",
//  }
  paragraphes: [
    "paragraph 1",
    "paragraph 2",
    "paragraph 3",
    "paragraph 4",
  ]
}

function game(state = game_init, action){
  switch (action.type){
    default:
      return state
  }
}

const gameScreens_init = {
  cur_screen: 0,
  enable_screens: {
    0: true,   //Intro
    1: false,  //Read
    2: false,  //Plan
    3: false,  //Do
    4: false   //Test
  }
};

function gameScreens(state = gameScreens_init, action){
  switch (action.type) {
    case TYPE.GO_NEXT_SCREEN:
      console.log('GO_NEXT_SCREEN');
      console.log(action.cur_screen);
      if(action.cur_screen < GameScreens.length - 1){
        return Object.assign({}, state, {cur_screen : state.cur_screen + 1});
      }else{
        return state
      }
    case TYPE.GO_PREVIOUS_SCREEN:
      console.log('GO_PREVIOUS_SCREEN');
      console.log(action.cur_screen);
      if(action.cur_screen > 0){
//        return action.cur_screen-1;
        return Object.assign({}, state, {cur_screen : state.cur_screen - 1});
      }else{
        return state
      }
    case TYPE.ENABLE_NEXT_SCREEN:
      var enable_screens = JSON.parse(JSON.stringify(state.enable_screens));
      enable_screens[state.cur_screen+1] = true;
      return Object.assign(
        {}, 
        state,
        {enable_screens, enable_screens});
    default:
      return state
  }
}


const todoApp = combineReducers({
  gameScreens,
  game,
  intro,
  read
})

export default todoApp