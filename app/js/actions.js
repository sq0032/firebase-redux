/*
 * action types
 */
export const TYPE = {
  GO_NEXT_SCREEN: 'GO_NEXT_SCREEN', 
  GO_PREVIOUS_SCREEN: 'GO_PREVIOUS_SCREEN', 
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