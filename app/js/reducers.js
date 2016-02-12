import { combineReducers } from 'redux';
import { TYPE, VARIABLETYPE, GameScreens } from './actions';
//import lodash from 'lodash';

  
const mockup = {
  //gameScreens reducer
  gameScreens: {
    cur_screen: 0,
    enable_screens: {
      0: true,   //Intro
      1: false,  //Read
      2: false,  //Plan
      3: true,  //Do
      4: false   //Test
    }
  },
  //gameState reducer
  gamestate: {
    statement: {
      text: "There were 10 apples on the tree on day 1",
    },
    sections: [
      {
        index: 0,
        order: 0,
        text: 'How many apples did Mark get if he colleted [5] apples and added them to [2] he already had?',
        default_variables: {
          question: [1,2],
          result: [3],
        },
        decleared_variables:{
          input: [],
          question: [],
          result: [],
          output: []
        },
        player: null,
        question: null,
        answer: null,
        watcher: []
      },
      {
        index: 1,
        order: 1,
        text: 'How many apples did Seid have if he already had [4] and Mark gave him all his apples?',
        default_variables: {
          default: [4],
          input: [],
          result: [5],          
          output: []
        },
        decleared_variables:{
          question: [],
          input: [],
          result: [],
          output: []          
        },        
        player: null,
        question: null,
        answer: null,
        watcher: []
      },
      {
        index: 2,
        order: 2,
        text: 'How many apples remained on the tree on day 1 after Mark ollected his apples?',
        variables: {
          default: [],
          input: [],
          output: [],
          result: [6]
        },
        player: null,
        question: null,
        answer: null,
        watcher: []
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
    },
    variables:[
      {
        vid: 0,
        value: 5,
        name: null,
        type: VARIABLETYPE.DEFAULT
      },
      {
        vid: 1,
        value: 5,
        name: null,
        type: VARIABLETYPE.DEFAULT
      },
      {
        vid: 2,
        value: 6,
        name: null,
        type: VARIABLETYPE.DEFAULT
      },
      {
        vid: 3,
        value: null,
        name: null,
        type: VARIABLETYPE.RESULT
      },
      {
        vid: 4,
        value: 2,
        name: null,
        type: VARIABLETYPE.DEFAULT
      },
      {
        vid: 5,
        value: null,
        name: null,
        type: VARIABLETYPE.RESULT
      },
      {
        vid: 6,
        value: null,
        name: null,
        type: VARIABLETYPE.RESULT
      },
    ]
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
      var slots = JSON.parse(JSON.stringify(state.slots));
      slots[action.index] = action.paragraph;
      return Object.assign({}, state, {slots:slots})
    default:
      return state
  }
}

function section(state, action){
  switch (action.type){
    case TYPE.DROP_PARAGRAPH:
      if (state.order == action.order &&
          state.index != action.index){
        return Object.assign({}, state, {order:null});
      } else if (state.index == action.index){
        return Object.assign({}, state, {order:action.order});
      } else {
        return state;
      }
    case TYPE.PLAN_SELECT_ANSWER:
      if (state.index == action.section_index){
        return Object.assign({}, state, {answer:action.answer_index});
      } else {
        return state;
      }
    case TYPE.PLAN_ASSIGN_PLAYER:
      if (state.index == action.section_index){
        return Object.assign({}, state, {player:action.player_index});
      } else {
        return state;
      }
    default:
      return state
  }
}

function sections(state, action){
  switch (action.type){
    case TYPE.DROP_PARAGRAPH:
      return state.map(s=>section(s,action));
    case TYPE.PLAN_SELECT_ANSWER:
      return state.map(s=>section(s,action));
    case TYPE.PLAN_ASSIGN_PLAYER:
      return state.map(s=>section(s,action));
//    case TYPE.PLAN_ENABLE_OUTPUT:
//      const length = state.length;
//      return state.map(s=>{
//        if (s.index == state.section_index){
//          return Object.assign(
//            {},
//            s,
//            {}
//          );
//        }
//      });
    default:
      return state
  }
}

function game(state = mockup.gamestate, action){
  switch (action.type){
    case TYPE.DROP_PARAGRAPH:
      return Object.assign(
        {}, 
        state,
        {sections: sections(state.sections, action)}
      );
    case TYPE.PLAN_SELECT_ANSWER:
      return Object.assign(
        {}, 
        state,
        {sections: sections(state.sections, action)}
      );
    case TYPE.DO_ADD_VARIABLE:
      const i = action.section_index;
      const l = action.line_num;
      const t = action.variable_type;
      const v = state.sections[i].default_variables[t][l-1];
      if (typeof(v)=='undefined'){
        
      }
      return state 
    default:
      return state
  }
}

const user_dic = {
  id: 1,
  name: 'Mark',
  cur_section: 0,
}

function players(state = [user_dic], action){
  switch (action.type){
//    case TYPE.JOIN_GAME:
//      return {
//        name: action.name
//      }
    default:
      return state
  }
}

function user(state = user_dic, action){
  switch (action.type){
//    case TYPE.JOIN_GAME:
//      return {
//        name: action.name
//      }
    case TYPE.DO_SWITCH_SECTION:
      return Object.assign(
        {},
        state,
        {cur_section: action.section_index}
      )
    default:
      return state
  }  
}

const gameScreens_init = {
  cur_screen: 3,
  enable_screens: {
    0: true,   //Intro
    1: false,  //Read
    2: false,  //Plan
    3: true,  //Do
    4: false   //Test
  }
};

function gameScreens(state = gameScreens_init, action){
  switch (action.type) {
    case TYPE.GO_NEXT_SCREEN:
      if(action.cur_screen < GameScreens.length - 1){
        return Object.assign({}, state, {cur_screen : state.cur_screen + 1});
      }else{
        return state
      }
    case TYPE.GO_PREVIOUS_SCREEN:
      if(action.cur_screen > 0){
        return Object.assign({}, state, {cur_screen : state.cur_screen - 1});
      }else{
        return state
      }
    case TYPE.ENABLE_NEXT_SCREEN:
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
  players,
  user
})


export default todoApp