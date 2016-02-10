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
  PLAN_SELECT_PLAYER: 'PLAN_SELECT_PLAYER',
  PLAN_ENABLE_OUTPUT: 'PLAN_ENABLE_OUTPUT',
  //DO
  DO_NAME_VARIABLE: 'DO_NAME_VARIABLE',
  DO_SELECT_FUNCTION: 'DO_SELECT_FUNCTION',
  DO_PASS_FUNCTION_PARAMETER: 'DO_PASS_FUNCTION_PARAMETER',
  DO_OUTPUT_VARIABLE: 'DO_OUTPUT_VARIABLE',
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