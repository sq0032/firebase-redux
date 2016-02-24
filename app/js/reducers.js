import { combineReducers } from 'redux';
import { TYPE, VARIABLETYPE, GameScreens } from './actions';
import immutable from 'immutable';
//import lodash from 'lodash';

export const mockup = {
  gameConfig: {
    max_num_outputs: 4
  },  
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
    config: {
      max_num_outputs: 4
    },    
    statement: {
      text: "There were 10 apples on the tree on day 1",
    },
    sections: [
      {
        index: 0,
        order: 0,
        text: 'How many apples did Mark get if he colleted [5] apples and added them to [2] he already had?',
        default_variables: {
          question: {
            0: 1,
            1: 2
          },
          result: {
            0: 3
          },
        },
        decleared_variables:{
          input: {},
          question: {},
          operation: {},
          output: {}
        },
        player: null,
        question: null,
        answer: null,
        watcher: {},
        num_outputs: 0
      },
      {
        index: 1,
        order: 1,
        text: 'How many apples did Seid have if he already had [4] and Mark gave him all his apples?',
        default_variables: {
          question: {
            0: 4
          },
          result: {
            0: 5
          },
        },
        decleared_variables:{
          question: {},
          input: {},
          operation: {},
          output: {}
        },
        player: null,
        question: null,
        answer: null,
        watcher: {},
        num_outputs: 0
      },
      {
        index: 2,
        order: 2,
        text: 'How many apples remained on the tree on day 1 after Mark ollected his apples?',
        default_variables: {
          question: {},
          result: {0: 6},
        },
        decleared_variables:{
          question: {},
          input: {},
          operation: {},
          output: {}          
        },
        player: null,
        question: null,
        answer: null,
        watcher: {},
        num_outputs: 0
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
    variables: {
      0: {
        vid: 0,
        value: null,
        name: null
      },
      1: {
        vid: 1,
        value: 5,
        name: {
          first: "Mark's",
          middle: "colleted",
          last: "apples"
        }
      },
      2: {
        vid: 2,
        value: 6,
        name: {
          first: "Mark's",
          middle: "existed",
          last: "apples"
        }
      },
      3: {
        vid: 3,
        value: null,
        name: {
          first: "Mark's",
          middle: "total",
          last: "apples"
        }
      },
      4: {
        vid: 4,
        value: 2,
        name: {
          first: "Seid's",
          middle: "existed",
          last: "apples"
        }
      },
      5: {
        vid: 5,
        value: null,
        name: {
          first: "Seid's",
          middle: "total",
          last: "apples"
        }
      },
      6: {
        vid: 6,
        value: null,
        name: {
          first: "Tree's",
          middle: "remained",
          last: "apples"
        }
      },
      7: {
        vid: 7,
        value: null,
        name: null
      }
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
export const mockup_dic = {
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
    config: {
      max_num_outputs: 4
    },    
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
          output: []
        },
        player: null,
        question: null,
        answer: null,
        watcher: [],
        num_outputs: 0
      },
      {
        index: 1,
        order: 1,
        text: 'How many apples did Seid have if he already had [4] and Mark gave him all his apples?',
        default_variables: {
          question: [4],
          result: [5],
        },
        decleared_variables:{
          question: [],
          input: [],
          operation: [],
          output: []          
        },
        player: null,
        question: null,
        answer: null,
        watcher: [],
        num_outputs: 0
      },
      {
        index: 2,
        order: 2,
        text: 'How many apples remained on the tree on day 1 after Mark ollected his apples?',
        default_variables: {
          question: [],
          result: [6],
        },
        decleared_variables:{
          question: [],
          input: [],
          operation: [],
          output: []          
        },
        player: null,
        question: null,
        answer: null,
        watcher: [],
        num_outputs: 0
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
        value: null,
        name: null,
        type: VARIABLETYPE.QUESTION
      },
      {
        vid: 1,
        value: 5,
        name: {
          first: "Mark's",
          middle: "colleted",
          last: "apples"
        },
        type: VARIABLETYPE.QUESTION
      },
      {
        vid: 2,
        value: 6,
        name: null,
        type: VARIABLETYPE.QUESTION
      },
      {
        vid: 3,
        value: null,
        name: {
          first: "Mark's",
          middle: "total",
          last: "apples"
        },
        type: VARIABLETYPE.RESULT
      },
      {
        vid: 4,
        value: 2,
        name: null,
        type: VARIABLETYPE.QUESTION
      },
      {
        vid: 5,
        value: null,
        name: {
          first: "Seid's",
          middle: "total",
          last: "apples"
        },
        type: VARIABLETYPE.RESULT
      },
      {
        vid: 6,
        value: null,
        name: null,
        type: VARIABLETYPE.RESULT
      },
      {
        vid: 7,
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
export const intro_init = {
  message: 'this is intro message',
  is_envelop_opened: false,
//  is_able_go_next: false,
//  is_able_go_previous: false
};
export function intro(state = intro_init, action){
  switch (action.type) {
    case TYPE.INTRO_OPEN_ENVELOP:
      return Object.assign({}, state, {is_envelop_opened:true});
    case TYPE.GO_NEXT_SCREEN:
      return state
    default:
      return state
  }
}
export const read_init = {
  slots: []
}
export function read(state = read_init, action){
  switch (action.type){
    case TYPE.READ_ORDER_SECTION:
      var slots = JSON.parse(JSON.stringify(state.slots));
      slots[action.index] = action.paragraph;
      return Object.assign({}, state, {slots:slots})
    default:
      return state
  }
}
export function section(state, action, vid){
  switch (action.type){
    case TYPE.READ_ORDER_SECTION:
      if (state.order == action.section_order &&
          state.index != action.section_index){
        return Object.assign({}, state, {order:null});
      } else if (state.index == action.section_index){
        return Object.assign({}, state, {order:action.section_order});
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
      section = section.setIn(['decleared_variables',action.variable_type,action.line_num-1], action.variable_id);
      return section.toJS();
    case TYPE.DO_SELECT_VARIABLE:
      if (action.section_index != state.index){
        return state;
      }
      var section = immutable.fromJS(state);
      section = section.setIn(['decleared_variables',action.variable_type,action.line_num-1], action.vid);
      return section.toJS();
    case TYPE.UPDATE_GAME_STATE:
      const section_index = state.index;
      const new_section = action.game_state.sections[section_index];
      var section = immutable.fromJS(state);
      //Update decleared_variables
      var variable_types = ['input','question','operation','output'];
      for(let i = 0; i < variable_types.length; i++){
        if (typeof(new_section.decleared_variables) == 'undefined' ||
            typeof(new_section.decleared_variables[variable_types[i]]) == 'undefined'){
          section = section.setIn(['decleared_variables',variable_types[i]], immutable.Map());
          continue;
        }
        var variables = {};
        for (let key in new_section.decleared_variables[variable_types[i]]){
          variables[key] = new_section.decleared_variables[variable_types[i]][key]
        }
        section = section.setIn(['decleared_variables',variable_types[i]], immutable.fromJS(variables));
      }
      //Update player
      section = section.set('player', typeof(new_section.player) == 'undefined' ? null : new_section.player);
      section = section.set('num_outputs', new_section.num_outputs);
      section = section.set('order', new_section.order);
//      section = section.set(new_section);
      
      return section.toJS();
    default:
      return state
  }
}
export function sections(state, action, vid){
  switch (action.type){
    case TYPE.READ_ORDER_SECTION:
      return state.map(s=>section(s,action));
    case TYPE.PLAN_SELECT_ANSWER:
      return state.map(s=>section(s,action));
    case TYPE.PLAN_ASSIGN_PLAYER:
      return state.map(s=>section(s,action));
    case TYPE.DO_ADD_VARIABLE:
      return state.map(s=>section(s,action));
//    case TYPE.DO_REMOVE_VARIABLE:
//      return state.map(s=>section(s,action));
    case TYPE.DO_SELECT_VARIABLE:
      return state.map(s=>section(s,action));
    case TYPE.DO_REMOVE_OUTPUT:
      return state.map(s=>section(s,action));
    case TYPE.UPDATE_GAME_STATE:
      return state.map(s=>section(s,action));
    default:
      return state
  }
}
export function variables(state, action){
  switch (action.type){
    case TYPE.UPDATE_GAME_STATE:
      const new_variables = action.game_state.variables;
      var new_variables_arr = {};
      for (let key in new_variables){
        new_variables_arr[key] = {};
        new_variables_arr[key].vid = new_variables[key].vid;
        new_variables_arr[key].value = typeof(new_variables[key].value) == 'undefined' ? null : new_variables[key].value;
        new_variables_arr[key].name = typeof(new_variables[key].name) == 'undefined' ? null : new_variables[key].name;
      }
      return new_variables_arr;
    default:
      return state
  }
}
export function computeResults(section_index, sections, variables){
    //Compute new result
    variables = immutable.fromJS(variables);
    variables = variables.toJS();
    const begin_order = sections[section_index].order;
    //Go through each section by order
    for (let m = begin_order; m < sections.length; m++){
      //Find the coresponding section
      for (let n = 0; n < sections.length; n++){
        if (sections[n].order != m){continue;}
        //Compute new result
        var operation_id_arr = sections[n].decleared_variables.operation;
        var result_id = sections[n].default_variables.result[0];
        variables[result_id].value = 0;
        for (let key in operation_id_arr){
          const operation = variables[operation_id_arr[key]];
          if (operation == null){continue;}
          if (operation.value == null){
            variables[result_id].value = null;
            break;
          } else {
            variables[result_id].value = variables[result_id].value + operation.value;
          }
        }
      }
    }
    return variables;
}
export function game(state = mockup.gamestate, action){
  var s_i, l, v_type = null;
  switch (action.type){
    case TYPE.READ_ORDER_SECTION:
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
    case TYPE.PLAN_SET_OUTPUT_NUMBER:
      s_i = action.section_index;
      var variables_state = immutable.fromJS(state.variables);
      var sections_state = immutable.fromJS(state.sections);
//      sections_state = sections_state.toJS();
      const output_length = sections_state.getIn([s_i,'decleared_variables','output']).size;
      const num_outputs = sections_state.getIn([s_i,'num_outputs']);
      sections_state = sections_state.setIn([s_i,'num_outputs'], action.output_number);
      if (action.output_number < output_length){
        for (let m = output_length; m > action.output_number; m--){
          var order = sections_state.getIn([s_i, 'order']);
          var vid = sections_state.getIn([s_i, 'decleared_variables', 'output']).last();
          sections_state = sections_state.setIn(
            [s_i, 'decleared_variables', 'output'],
            sections_state.getIn([s_i, 'decleared_variables', 'output']).pop()
          );
          if(!vid){continue;}
          for (let i = order; i < sections_state.size; i++){
            var temp_s_i = sections_state.findIndex(s => s.get('order')==i);
            var d_vs = sections_state.getIn([temp_s_i, 'decleared_variables']);
            if (i > order){
              //Remove variable from input array
              for (let j = 0; j < d_vs.get('input').size; j++){
                if ( d_vs.getIn(['input', j]) == vid ){
                  sections_state = sections_state.setIn([temp_s_i, 'decleared_variables', 'input', j], null);
                }
              }
              //Remove variable from question array
              for (let j = 0; j < d_vs.get('question').size; j++){
                if ( d_vs.getIn(['question', j]) == vid ){
                  sections_state = sections_state.setIn([temp_s_i, 'decleared_variables', 'question', j], null);
                }
              }
              //Remove variable from operation array
              for (let j = 0; j < d_vs.get('operation').size; j++){
                if ( d_vs.getIn(['operation', j]) == vid ){
                  sections_state = sections_state.setIn([temp_s_i, 'decleared_variables', 'operation', j], null);
                }
              }
            }
            if (i >= order){
              //Remove variable from operation array
              for (let j = 0; j < d_vs.get('output').size; j++){
                if ( d_vs.getIn(['output', j]) == vid ){
                  sections_state = sections_state.setIn([temp_s_i, 'decleared_variables', 'output', j], null);
                }
              }
            }
          }
        }
      }
      variables_state = computeResults(s_i, sections_state.toJS(), variables_state);
      return Object.assign(
        {}, 
        state,
        {variables: variables_state},
        {sections: sections_state.toJS()}
      );
    case TYPE.DO_ADD_VARIABLE:
            s_i = action.section_index;
            l = action.line_num;
            v_type = action.variable_type;
      var vid = action.variable_id;
      var variables_state = immutable.fromJS(state.variables);
      variables_state = variables_state.toJS();
      var sections_state = null;
      //Checktype
      switch (v_type){
        case VARIABLETYPE.QUESTION:
          if (typeof(vid)=='undefined'){
//            action.variable_id = variables_state[variables_state.length-1].vid+1;
            action.variable_id = Math.max(...Object.keys(variables_state))+1;
            variables_state[action.variable_id] = {
              vid: action.variable_id, 
              value: null, 
              name: null
            };
          }
          sections_state = sections(state.sections, action);
          break;
        case VARIABLETYPE.OPERATION:
          //Add the operation variable
          sections_state = sections(state.sections, action);
          variables_state = computeResults(s_i, sections_state, variables_state);
          break;
        case VARIABLETYPE.OUTPUT:
          //Add the operation variable
          sections_state = sections(state.sections, action);
          
          //Add input variables in the next section
          const order = sections_state[s_i].order;
          for (let n = 0; n < sections_state.length; n++){
            if (sections_state[n].order == order+1){
              sections_state[n].decleared_variables.input = Object.assign(
                {}, sections_state[s_i].decleared_variables.output
              );
            }
          }
          break;
      }
      return Object.assign(
        {},
        state,
        {variables: variables_state},
        {sections: sections_state}
      );
    case TYPE.DO_REMOVE_VARIABLE:
      s_i = action.section_index;
      l = action.line_num;
      v_type = action.variable_type;
      var variables_state = immutable.fromJS(state.variables);
      variables_state = variables_state.toJS();      
      var sections_state = immutable.fromJS(state.sections);
      switch (v_type){
        case VARIABLETYPE.QUESTION:
          var order = sections_state.getIn([s_i, 'order']);
          var vid = sections_state.getIn([s_i, 'decleared_variables', v_type, (l-1).toString()]);
          for (let i = order; i < sections_state.size; i++){
            var temp_s_i = sections_state.findIndex(s => s.get('order') == i);
            var d_vs = sections_state.getIn([temp_s_i, 'decleared_variables']);
            if (i > order){
              //Remove variable from input array
              for (let key in d_vs.get('input').toJS()){
                if ( d_vs.getIn(['input', key]) == vid ){
                  sections_state = sections_state.setIn([temp_s_i, 'decleared_variables', 'input', key], null);
                }
              }              
            }
            if (i >= order){
              //Remove variable from question array
              for (let key in d_vs.get('question').toJS()){
                if ( d_vs.getIn(['question', key]) == vid ){
                  sections_state = sections_state.setIn([temp_s_i, 'decleared_variables', 'question', key], null);
                }
              }
              //Remove variable from operation array
              for (let key in d_vs.get('operation').toJS()){
                if ( d_vs.getIn(['operation', key]) == vid ){
                  sections_state = sections_state.setIn([temp_s_i, 'decleared_variables', 'operation', key], null);
                }
              }              
              //Remove variable from operation array
              for (let key in d_vs.get('output').toJS()){
                if ( d_vs.getIn(['output', key]) == vid ){
                  sections_state = sections_state.setIn([temp_s_i, 'decleared_variables', 'output', key], null);
                }
              }                    
            }
          }
          break;
        case VARIABLETYPE.OPERATION:
          var order = sections_state.getIn([s_i, 'order']);
          var vid = sections_state.getIn([s_i, 'decleared_variables', v_type, (l-1).toString()]);
          for (let i = order; i < sections_state.size; i++){
            var temp_s_i = sections_state.findIndex(s => s.get('order')==i);
            var d_vs = sections_state.getIn([temp_s_i, 'decleared_variables']);
            if (i > order){
              //Remove variable from input array
              for (let key in d_vs.get('input').toJS()){
                if ( d_vs.getIn(['input', key]) == vid ){
                  sections_state = sections_state.setIn([temp_s_i, 'decleared_variables', 'input', key], null);
                }
              }
              //Remove variable from question array
              for (let key in d_vs.get('question').toJS()){
                if ( d_vs.getIn(['question', key]) == vid ){
                  sections_state = sections_state.setIn([temp_s_i, 'decleared_variables', 'question', key], null);
                }
              }
            }
            if (i >= order){
              //Remove variable from operation array
              for (let key in d_vs.get('operation').toJS()){
                if ( d_vs.getIn(['operation', key]) == vid ){
                  sections_state = sections_state.setIn([temp_s_i, 'decleared_variables', 'operation', key], null);
                }
              } 
              //Remove variable from operation array
              for (let key in d_vs.get('output').toJS()){
                if ( d_vs.getIn(['output', key]) == vid ){
                  sections_state = sections_state.setIn([temp_s_i, 'decleared_variables', 'output', key], null);
                }
              }
            }
          }
          break;
        case VARIABLETYPE.OUTPUT:
          var order = sections_state.getIn([s_i, 'order']);
          var vid = sections_state.getIn([s_i, 'decleared_variables', v_type, (l-1).toString()]);
          for (let i = order; i < sections_state.size; i++){
            var temp_s_i = sections_state.findIndex(s => s.get('order')==i);
            var d_vs = sections_state.getIn([temp_s_i, 'decleared_variables']);
            if (i > order){
              //Remove variable from input array
              for (let key in d_vs.get('input').toJS()){
                if ( d_vs.getIn(['input', key]) == vid ){
                  sections_state = sections_state.setIn([temp_s_i, 'decleared_variables', 'input', key], null);
                }
              }
              //Remove variable from question array
              for (let key in d_vs.get('question').toJS()){
                if ( d_vs.getIn(['question', key]) == vid ){
                  sections_state = sections_state.setIn([temp_s_i, 'decleared_variables', 'question', key], null);
                }
              }
              //Remove variable from operation array
              for (let key in d_vs.get('operation').toJS()){
                if ( d_vs.getIn(['operation', key]) == vid ){
                  sections_state = sections_state.setIn([temp_s_i, 'decleared_variables', 'operation', key], null);
                }
              } 
            }
            if (i >= order){
              //Remove variable from operation array
              for (let key in d_vs.get('output').toJS()){
                if ( d_vs.getIn(['output', key]) == vid ){
                  sections_state = sections_state.setIn([temp_s_i, 'decleared_variables', 'output', key], null);
                }
              }
            }
          }
          break;
      }
      
      variables_state = computeResults(s_i, sections_state.toJS(), variables_state);
      
      return Object.assign(
        {},
        state,
        {variables: variables_state},
        {sections: sections_state.toJS()}
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
    case TYPE.UPDATE_GAME_STATE:
      return Object.assign(
        {},
        state,
        {variables: variables(state.variables, action)},
        {sections: sections(state.sections, action)}
      );
    default:
      return state
  }
}
export const user_dic = {
  id: 1,
  name: 'Mark',
  cur_section: 0,
}
export function players(state = [user_dic], action){
  switch (action.type){
//    case TYPE.JOIN_GAME:
//      return {
//        name: action.name
//      }
    default:
      return state
  }
}
export function user(state = user_dic, action){
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
export const gameScreens_init = {
  cur_screen: 2,
  enable_screens: {
    0: true,   //Intro
    1: false,  //Read
    2: false,  //Plan
    3: true,  //Do
    4: false   //Test
  }
};
export function gameScreens(state = gameScreens_init, action){
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

import Firebase from 'firebase';
var rootRef = new Firebase('https://blazing-fire-2123.firebaseio.com');
var gameRef = rootRef.child('game');
gameRef.set(mockup.gamestate);

export default gameApp