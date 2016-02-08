/*
 * action types
 */
export const TYPE = {
  GO_NEXT_SCREEN: 'GO_NEXT_SCREEN', 
  GO_PREVIOUS_SCREEN: 'GO_PREVIOUS_SCREEN', 
  INTRO_OPEN_ENVELOP: 'INTRO_OPEN_ENVELOP',
  ENABLE_NEXT_SCREEN: 'ENABLE_NEXT_SCREEN',
  DROP_PARAGRAPH: 'DROP_PARAGRAPH',
}


/*
 * component types (for DnD)
 */
export const DNDTYPE = {
  DRAGABLE_PARAGRAPH: 'DRAGABLE_PARAGRAPH',
  DROPPABLE_SLOT: 'DROPPABLE_SLOT',
  READ_SLOT: 'READ_SLOT', 
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
  
export function openEnvelop(){
  return {
    type: TYPE.INTRO_OPEN_ENVELOP
  }
}
  
export function enableNextScreen(){
  return {
    type: TYPE.ENABLE_NEXT_SCREEN
  }
}    
  
export function dropParagraph(payload){
  return {
    type: TYPE.DROP_PARAGRAPH,
    paragraph: payload.paragraph,
    index: payload.index
  }
}  