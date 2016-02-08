import { combineReducers } from 'redux'
import { TYPE, GameScreens } from './actions'

const intro_init = {
  message: 'this is intro message',
  is_envelop_opened: false,
//  is_able_go_next: false,
//  is_able_go_previous: false
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
  slots: []
}

function read(state = read_init, action){
  switch (action.type){
    case TYPE.DROP_PARAGRAPH:
      console.log('DROP_PARAGRAPH');
      var slots = JSON.parse(JSON.stringify(state.slots));
      slots[action.index] = action.paragraph;
      return Object.assign({}, state, {slots:slots})
    default:
      return state
  }
}

const game_init = {
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

function players(state = [], action){
  switch (action.type){
    case TYPE.JOIN_GAME:
      return {
        name: action.name
      }
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
      console.log('ENABLE_NEXT_SCREEN');
      var enable_screens = JSON.parse(JSON.stringify(state.enable_screens));
      enable_screens[state.cur_screen+1] = true;
      console.log(enable_screens);
      return Object.assign(
        {},
        state,
        {enable_screens: enable_screens});
    default:
      return state
  }
}



const todoApp = combineReducers({
  gameScreens,
  game,
  intro,
  read,
  players
})

const mockup = {
  //gameScreens reducer
  gameScreens: {
    cur_screen: 0,
    enable_screens: {
      0: true,   //Intro
      1: false,  //Read
      2: false,  //Plan
      3: false,  //Do
      4: false   //Test
    }
  },
  //gameState reducer
  gamestate: {
    statement: {
      text: "There were 10 apples on the tree on day 1",
    },
    secions: [
      {
        index: 1,
        text: 'How many apples did Mark get if he colleted [5] apples and added them to [2] he already had?',
        variables: {
          //Variables that go with the question
          default: [
            {
              index: 1,
              value: 5,
              name: null
            }
          ],
          //Variables that are passed from other user 
          input: [
            {
              index: 1,
              value: 4,
              name: {
                first: 'first',
                middle: 'middle',
                last: 'last',
              }
            }
          ],
          //Variables that defined 
          definded: []  //use for
        },
        variables: [
          {
            index: 1,
            value: 5,
            name: null,
          },
          {
            index: 2,
            value: 2,
            name: null,
          },
        ],
        player: null,
        question: null,
        answer: null,
        input: [],
        output: [],
        return: []
      },
      {
        index: 2,
        text: 'How many apples did Seid have if he already had [4] and Mark gave him all his apples?',
        variables: [
          {
            index: 1,
            value: 4,
            name: null,
          }
        ],
        player: null,
        question: null,
        answer: null,
        input: [],
        output: [],
        return: []    
      },
      {
        index: 3,
        text: 'How many apples remained on the tree on day 1 after Mark ollected his apples?',
        variables: [],
        player: null,
        question: null,
        answer: null,
        input: [],
        output: [],
        return: []
      }
    ],
    answers: [
      {index: 1, text: "Mark got # apples"},
      {index: 2, text: "Mark got # chairs"},
      {index: 3, text: "Mark got # starts"},
      {index: 4, text: "Seid got # apples"},
      {index: 5, text: "Seid got # charis"},
      {index: 6, text: "Seid got # stars"},
      {index: 7, text: "On the tree # apples remained"},
      {index: 8, text: "On the tree # charis remained"},
      {index: 9, text: "On the tree # stars remained"}
    ],
    varable_names:{
      first: [
        {index: 1, text: "Mark's"},
        {index: 2, text: "Seid's"},
      ],
      middle: [
        {index: 1, text: "existing"},
        {index: 2, text: "total"},
        {index: 3, text: "colleted"},
      ],
      last: [
        {index: 1, text: "apples"},
        {index: 2, text: "chairs"},
      ]
    }
  },
  //read reducer
  read: {
    slots: []
  },
  //intro reducer
  intro: {
    message: 'this is intro message',
    is_envelop_opened: false,
  }
};


export default todoApp