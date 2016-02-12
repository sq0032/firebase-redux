/*
 * action types
 */
export const TYPE = {
  //GENERAL
  GO_NEXT_SCREEN: 'GO_NEXT_SCREEN', 
  GO_PREVIOUS_SCREEN: 'GO_PREVIOUS_SCREEN', 
  ENABLE_NEXT_SCREEN: 'ENABLE_NEXT_SCREEN',
  //INTRO
  INTRO_OPEN_ENVELOP: 'INTRO_OPEN_ENVELOP',
  //READ
  DROP_PARAGRAPH: 'DROP_PARAGRAPH',
  //PLAN
  PLAN_SELECT_ANSWER: 'PLAN_SELECT_ANSWER',
  PLAN_ASSIGN_PLAYER: 'PLAN_ASSIGN_PLAYER',
  PLAN_ENABLE_OUTPUT: 'PLAN_ENABLE_OUTPUT',
  //DO
  DO_NAME_VARIABLE: 'DO_NAME_VARIABLE',
  DO_SELECT_FUNCTION: 'DO_SELECT_FUNCTION',
  DO_PASS_FUNCTION_PARAMETER: 'DO_PASS_FUNCTION_PARAMETER',
  DO_OUTPUT_VARIABLE: 'DO_OUTPUT_VARIABLE',
  DO_SWITCH_SECTION: 'DO_SWITCH_SECTION',
  DO_ADD_VARIABLE: 'DO_ADD_VARIABLE',
  DO_REMOVE_VARIABLE: 'DO_REMOVE_VARIABLE',
  DO_SELECT_OUTPUT_VARIABLE: 'DO_SELECT_OUTPUT_VARIABLE',
  DO_SELECT_FIRST_NAME: 'DO_SELECT_FIRST_NAME',
  DO_SELECT_MIDDLE_NAME: 'DO_SELECT_MIDDLE_NAME',
  DO_SELECT_LAST_NAME: 'DO_SELECT_LAST_NAME',
}


export const VARIABLETYPE = {
  DEFAULT: 'DEFAULT',
  INPUT: 'INPUT',
  OUTPUT: 'OUTPUT',
  RESULT: 'RESULT',
}

/*
 * component types (for DnD)
 */
export const DNDTYPE = {
  DRAGABLE_PARAGRAPH: 'DRAGABLE_PARAGRAPH',
  DROPPABLE_SLOT: 'DROPPABLE_SLOT',
}


/*
 * other constants
 */

export const GameScreens = [
  'INTRO',
  'READ',
  'PLAN',
  'DO',
  'TEST',
]

/*
 * action creators
 */
/*
 * General actions
 */
export function goNextScreen(cur_screen){
  return {
    type: TYPE.GO_NEXT_SCREEN,
    cur_screen: cur_screen,
  };
}
export function goPreviousScreen(cur_screen){
  return {
    type: TYPE.GO_PREVIOUS_SCREEN,
    cur_screen: cur_screen,
  };
}
export function enableNextScreen(){
  return {
    type: TYPE.ENABLE_NEXT_SCREEN
  }
}
/*
 * Intro actions
 */
export function openEnvelop(){
  return {
    type: TYPE.INTRO_OPEN_ENVELOP
  }
}
/*
 * Read actions
 */
export function dropParagraph(payload){
  return {
    type: TYPE.DROP_PARAGRAPH,
    paragraph: payload.paragraph,
    index: payload.index,
    order: payload.order,
  }
}
/*
 * Plan actions
 */
export function selectAnswer(section_index, answer_index){
  return {
    type: TYPE.PLAN_SELECT_ANSWER,
    section_index: section_index,
    answer_index: answer_index,
  }
}
export function assignPlayer(section_index, player_id){
  return {
    type: TYPE.PLAN_ASSIGN_PLAYER,
    section_index: section_index,
    player_id: player_id,
  }
}
export function enableOutput(section_index, output_number){
  return {
    type: TYPE.PLAN_ENABLE_OUTPUT,
    section_index: section_index,
    output_number: output_number,
  }
}
  
/*
 * Do actions
 */
export function switchSection(section_index){
  return {
    type: TYPE.DO_SWITCH_SECTION,
    section_index: section_index,
  }
}  
export default addVariable(section_index, line_num, variable_type){
  return {
    type: TYPE.DO_ADD_VARIABLE,
    section_index: section_index,
    line_num: line_num,
    variable_type: variable_type
  }
}
export default removeVariable(section_index, line_num, variable_type){
  return {
    type: TYPE.DO_REMOVE_VARIABLE,
    section_index: section_index,
    line_num: line_num,
    variable_type: variable_type
  }
}