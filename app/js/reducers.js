import { combineReducers } from 'redux';
import { TYPE, VARIABLETYPE, GameScreens } from './actions';
import immutable from 'immutable';
//import lodash from 'lodash';

  
export const mockup = {
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
          operation: [],
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
          question: [4],
          input: [],
          result: [5],
          output: []
        },
        decleared_variables:{
          question: [],
          input: [],
          operation: [],
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
        default_variables: {
          question: [],
          input: [],
          result: [],
          output: []
        },
        decleared_variables:{
          question: [],
          input: [],
          operation: [],
          result: [],
          output: []          
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

function section(state, action, vid){
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
    case TYPE.DO_ADD_VARIABLE:
      if (action.section_index != state.index){
        return state;
      }
      var section = immutable.fromJS(state);
      section = section.setIn(['decleared_variables',action.variable_type,action.line_num-1], vid);
      return section.toJS();
    case TYPE.DO_SELECT_VARIABLE:
      if (action.section_index != state.index){
        return state;
      }
      var section = immutable.fromJS(state);
      section = section.setIn(['decleared_variables',action.variable_type,action.line_num-1], action.vid);
      return section.toJS();
    case TYPE.DO_REMOVE_VARIABLE:
      if (action.section_index != state.index)
        return state;
      
      var section = immutable.fromJS(state);
      section = section.setIn(['decleared_variables',action.variable_type,action.line_num-1], null);
      return section.toJS();

    default:
      return state
  }
}

function sections(state, action, vid){
  switch (action.type){
    case TYPE.DROP_PARAGRAPH:
      return state.map(s=>section(s,action));
    case TYPE.PLAN_SELECT_ANSWER:
      return state.map(s=>section(s,action));
    case TYPE.PLAN_ASSIGN_PLAYER:
      return state.map(s=>section(s,action));
    case TYPE.DO_ADD_VARIABLE:
      return state.map(s=>section(s,action,vid));
    case TYPE.DO_REMOVE_VARIABLE:
      return state.map(s=>section(s,action));
    case TYPE.DO_SELECT_VARIABLE:
      return state.map(s=>section(s,action));
    case TYPE.DO_REMOVE_OUTPUT:
      return state.map(s=>section(s,action));
    default:
      return state
  }
}

export function game(state = mockup.gamestate, action){
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
      const s_i = action.section_index,
            l = action.line_num,
            v_type = action.variable_type;
      var variables = [...state.variables];
      
      //Checktype
      switch (v_type){
        case VARIABLETYPE.QUESTION:
          var vid = state.sections[s_i].default_variables[v_type][l-1];
          if (typeof(vid)=='undefined'){
            vid = variables[variables.length-1].vid+1;
            variables.push({vid: vid, value: null, name: null});
          }
          break;
        case VARIABLETYPE.OPERATION:
          //Do nothing
          break;
        case VARIABLETYPE.OUTPUT:
          //Do nothing
          break;
      }
      
//          console.log('vid');
      return Object.assign(
        {},
        state,
        {variables: variables},
        {sections: sections(state.sections, action, vid)}
      );
    case TYPE.DO_REMOVE_VARIABLE:
      return Object.assign(
        {},
        state,
        {sections: sections(state.sections, action)}
      );
    case TYPE.DO_SELECT_VARIABLE:
      return Object.assign(
        {},
        state,
        {sections: sections(state.sections, action)}
      );
    case TYPE.DO_REMOVE_OUTPUT:
      return Object.assign(
        {},
        state,
        {sections: sections(state.sections, action)}
      );
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
      return Object.assign(
        {},
        state,
        {enable_screens: enable_screens});
    default:
      return state
  }
}



const gameApp = combineReducers({
  gameScreens,
  game,
  intro,
  read,
  players,
  user
})


export default gameApp