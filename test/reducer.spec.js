import {game, computeResults} from '../app/js/reducers';
import * as actions from '../app/js/actions';
import immutable from 'immutable';
import expect from 'expect.js';

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
        text: 'How many apples did Sam get if he colleted [5] apples and added them to [2] he already had?',
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
          result: {},
          output: {}
        },
        player: null,
        question: null,
        answer: null,
        operation: null,
        watcher: {},
        num_outputs: 0,
        is_input_opened: false,
        is_question_opened: false,
        is_operation_opened: false,
        is_result_opened: false,
        is_output_opened: false,
      },
      {
        index: 1,
        order: 1,
        text: 'How many apples did Amenda have if he already had [4] and Sam gave him all his apples?',
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
          result: {},
          output: {}
        },
        player: null,
        question: null,
        answer: null,
        operation: null,
        watcher: {},
        num_outputs: 0,
        is_input_opened: false,
        is_question_opened: false,
        is_operation_opened: false,
        is_result_opened: false,
        is_output_opened: false,        
      },
      {
        index: 2,
        order: 2,
        text: 'How many apples remained on the tree on day 1 after Sam ollected his apples?',
        default_variables: {
          question: {},
          result: {0: 6},
        },
        decleared_variables:{
          question: {},
          input: {},
          operation: {},
          result: {},
          output: {}          
        },
        player: null,
        question: null,
        answer: null,
        operation: null,
        watcher: {},
        num_outputs: 0,
        is_input_opened: false,
        is_question_opened: false,
        is_operation_opened: false,
        is_result_opened: false,
        is_output_opened: false,        
      }
    ],
    answers: {
      0: "Sam got # apples",
      1: "Sam got # chairs",
      2: "Sam got # starts",
      3: "Amenda got # apples",
      4: "Amenda got # charis",
      5: "Amenda got # stars",
      6: "On the tree # apples remained",
      7: "On the tree # charis remained",
      8: "On the tree # stars remained",
    },
    varable_names:{
      first: {
        0: {text: "Sam's"},
        1: {text: "Amenda's"},
        2: {text: "Tree's"}
      },
      middle: {
        0: {text: "existing"},
        1: {text: "total"},
        2: {text: "colleted"},
        3: {text: "remained"}
      },
      last: {
        0: {text: "apples"},
        1: {text: "chairs"}
      }
    },
    variables: {
      0: {
        vid: 0,
        value: null,
        name: null,
        comment: null
      },
      1: {
        vid: 1,
        value: 5,
        name: {
          first: 0,
          middle: 2,
          last: 0
        },
        comment: null
      },
      2: {
        vid: 2,
        value: 6,
        name: {
          first: 0,
          middle: 0,
          last: 0
        },
        comment: null
      },
      3: {
        vid: 3,
        value: null,
        name: {
          first: 0,
          middle: 1,
          last: 0
        },
        comment: null
      },
      4: {
        vid: 4,
        value: 2,
        name: {
          first: 1,
          middle: 0,
          last: 0
        },
        comment: null
      },
      5: {
        vid: 5,
        value: null,
        name: {
          first: 1,
          middle: 1,
          last: 0
        },
        comment: null
      },
      6: {
        vid: 6,
        value: null,
        name: {
          first: 2,
          middle: 3,
          last: 0
        },
        comment: null
      },
      7: {
        vid: 7,
        value: null,
        name: {
          first: null,
          middle: null,
          last: null
        },
        comment: null
      },
    },
    operations: {
      0: {
        name: actions.OPERATIONTYPE.ADDITION,
        description: 'The addition of two whole numbers is the total amount of those quantities combined.',
        symbol: '+'
      },
      1: {
        name: actions.OPERATIONTYPE.SUBTRACTION,
        symbol: '-'
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

const game_state_firebase_mockup = {
  statement: {
    text: "There were 10 apples on the tree on day 1",
  },
  sections: {
    0: {
      index: 0,
      order: 0,
      text: 'How many apples did Sam get if he colleted [5] apples and added them to [2] he already had?',
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
        operation: {
          4: 8  //add one variable
        },
        output: {}
      },
      player: null,
      question: null,
      answer: null,
      watcher: {},
      num_outputs: 0
    },
    1: {
      index: 1,
      order: 1,
      text: 'How many apples did Amenda have if he already had [4] and Sam gave him all his apples?',
      default_variables: {
        question: {0: 4},
        result: {0: 5},
      },
      decleared_variables:{
        question: {},
        input: {},
        operation: [3],
        output: {},         
      },
      player: null,
      question: null,
      answer: null,
      watcher: {},
      num_outputs: 0
    },
    2: {
      index: 2,
      order: 2,
      text: 'How many apples remained on the tree on day 1 after Sam ollected his apples?',
      default_variables: {
        question: {},
        result: {0:6}
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
  },
  answers: {
    0: {index: 1, text: "Sam got # apples"},
    1: {index: 2, text: "Sam got # chairs"},
    2: {index: 3, text: "Sam got # starts"},
    3: {index: 4, text: "Amenda got # apples"},
    4: {index: 5, text: "Amenda got # charis"},
    5: {index: 6, text: "Amenda got # stars"},
    6: {index: 7, text: "On the tree # apples remained"},
    7: {index: 8, text: "On the tree # charis remained"},
    8: {index: 9, text: "On the tree # stars remained"}
  },
  varable_names:{
    first: {
      0: {index: 1, text: "Sam's"},
      1: {index: 2, text: "Amenda's"},
    },
    middle: {
      0: {index: 1, text: "existing"},
      1: {index: 2, text: "total"},
      2: {index: 3, text: "colleted"},
    },
    last: {
      0: {index: 1, text: "apples"},
      1: {index: 2, text: "chairs"}
    }
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
        first: "Sam's",
        middle: "colleted",
        last: "apples"
      }
    },
    2: {
      vid: 2,
      value: 6,
      name: null
    },
    3: {
      vid: 3,
      value: 7, //update varibale value from null to 7
      name: {
        first: "Sam's",
        middle: "total",
        last: "apples"
      }
    },
    4: {
      vid: 4,
      value: 2,
      name: null
    },
    5: {
      vid: 5,
      value: null,
      name: {
        first: "Amenda's",
        middle: "total",
        last: "apples"
      }
    },
    6: {
      vid: 6,
      value: null,
      name: null
    },
    7: {
      vid: 7,
      value: null,
      name: null
    },
    8: {  //add one definede variable
      vid: 8,
      value: null,
      name: null
    }
  }
};

describe('App', () => {
  describe('READ', () => {
    describe('When player orders a game section', () => {
      let state = null;
      beforeEach(() => {
        //Setup testing enviroment
        state = immutable.fromJS(game(mockup.gamestate, {})).toJS();
        state = immutable.fromJS(state);
        state = state.toJS();
        state.sections[0].order = null;
        state.sections[1].order = null;
        state.sections[2].order = null;
      });
      it('should change the section order', () => {
        state = game(state, actions.orderSection(2,1));
        expect(state.sections[2].order).to.equal(1);
      });
      it('should clear the section order if the section has been overwritten', () => {
        state = game(state, actions.orderSection(2,1));
        state = game(state, actions.orderSection(2,0));
        state = game(state, actions.orderSection(1,1));
        state = game(state, actions.orderSection(1,0));
        expect(state.sections[1].order).to.equal(0);
        expect(state.sections[2].order).to.equal(null);
      });
    });
  });
  describe('PLAN', () => {
    let state = null;
    beforeEach(() => {
      //Setup testing enviroment
      state = immutable.fromJS(game(mockup.gamestate, {})).toJS();
    });
    describe('When player sets an output number', () => {
      beforeEach(() => {
        //Setup testing enviroment
        state = immutable.fromJS(game(mockup.gamestate, {})).toJS();
        state = immutable.fromJS(state);
        state = state.toJS();
        state.sections[0].decleared_variables.question = [1, null, null, 7];  //1 is 5, 7 is null
        state.sections[0].decleared_variables.operation = [1, 7];
        state.sections[0].decleared_variables.output = [3, 1];  //3 is result, default vaule is null
        state.sections[0].num_outputs = 2;
        state.sections[0].operation = 0;
        
        state.sections[1].decleared_variables.input = [1, 3];
        state.sections[1].decleared_variables.operation = [1, 4]; //4 is 2
        state.sections[1].decleared_variables.output = [1, 5]; //5 is result, default value is 5+2=7
        state.sections[1].num_outputs = 2;
        state.sections[1].operation = 0;
        
        state.sections[2].decleared_variables.input = [1, 5];
        state.sections[2].decleared_variables.operation = [1, 5]; //result is 5+7=12
        state.sections[2].num_outputs = 0;
        state.sections[2].operation = 0;
        state.variables = computeResults(0, state.sections, state.variables, state.operations, state.operations);
      });
      it('should add more output slots if the number increased', () => {
        expect(state.sections[0].num_outputs).to.equal(2);
        state = game(state, actions.setOutputNumber(0,3));
        expect(state.sections[0].num_outputs).to.equal(3);
      });
      it('should reduce slots and update new result if the number decreased', () => {
        state = game(state, actions.setOutputNumber(0,0));
        expect(Object.keys(state.sections[0].decleared_variables.output)).to.have.length(0);
        expect(state.variables[5].value).to.equal(2);
      });
    });
    describe('When player select an answer for a section', () => {
      it('should add the answer to the section', () => {
        expect(state.sections[0].answer).to.equal(null);
        state = game(state, actions.selectAnswer(0,1));
        expect(state.sections[0].answer).to.equal(1);
      });      
    });
    describe('When team leader assigned a player to a game section', () => {
      it('should add the player to the game section', () => {
        expect(state.sections[0].player).to.equal(null);
        state = game(state, actions.assignPlayer(0, 1));
        expect(state.sections[0].player).to.equal(1);
      });
    });
  });
  describe('DO', () => {
    it('should return initial state', () => {
      expect(
        immutable.fromJS(game(mockup.gamestate, {})).toJS().sections.length
      ).to.equal(3);
    });
    
    describe('When player adds a variable', () => {
      let state = null;
      beforeEach(()=>{
        state = immutable.fromJS(game(mockup.gamestate, {})).toJS();
        state.sections[1].decleared_variables.operation = {0: 3};
        state.sections[0] = {...state.sections[0], operation:0};
        state.sections[1].operation = 0;
        state.sections[2].operation = 0;
      });
      it('should declear the question variable', () => {
        //Adding an pre-decleared variable
        //should add the variable id into question variable array
        var vid = state.sections[0].default_variables.question[1];
        state = game(state, actions.addVariable(0, 2, actions.VARIABLETYPE.QUESTION, vid));
        expect(state.sections[0].decleared_variables.question[1]).to.equal(vid);
        
        //Adding an non-pre-decleared variable
        //should create a new variable and add the id into question variable array
        var length = Object.keys(state.variables).length;
        vid = Math.max(...Object.keys(state.variables));
        state = game(state, actions.addVariable(0, 5, actions.VARIABLETYPE.QUESTION));
        vid = vid+1;
        expect(Object.keys(state.variables)).to.have.length(length+1);
        expect(state.sections[0].decleared_variables.question[4]).to.equal(vid);
      });
      it('should select the operation variable and update result', () => {
        //Adding an validated variable (number)
        //Should add the variable id into operation variable array and update answer value (number)`
        
        //Add the first variable
        var vid = 2;
        state = game(state, actions.addVariable(0, 1, actions.VARIABLETYPE.OPERATION, vid));
        var result_id = state.sections[0].default_variables.result[0];
        var result = state.variables[result_id];
        expect(state.sections[0].decleared_variables.operation[0]).to.equal(vid);
        expect(result.value).to.equal(6);
        
        //Add the second variable
        vid = 1;
        state = game(state, actions.addVariable(0, 2, actions.VARIABLETYPE.OPERATION, vid));
        result = state.variables[result_id];
        expect(state.sections[0].decleared_variables.operation[1]).to.equal(vid);
        expect(result.value).to.equal(11);
        //Update result values in every following sections
        var result_id_2 = state.sections[1].default_variables.result[0];
        expect(state.variables[result_id_2].value).to.equal(11);
        
        
        //Adding an non-validated variable (null)
        //Should add the variable id into operation variable array and update answer value (null)
        vid = 0;
        state = game(state, actions.addVariable(0, 3, actions.VARIABLETYPE.OPERATION, vid));
        result = state.variables[result_id];
        expect(state.sections[0].decleared_variables.operation[2]).to.equal(vid);
        expect(result.value).to.equal(null);
      });
      it('should declear result variable', () => {
        //Adding an validated variable (number)
        //Should add the variable id into operation variable array and update answer value (number)`
        
        //Add the first variable
        state = game(state, actions.addVariable(0, 4, actions.VARIABLETYPE.RESULT));
        var result_id = state.sections[0].decleared_variables.result[3];
        var result = state.variables[result_id];
        expect(result_id).to.equal(8);
        expect(result.value).to.equal(null);
        expect(result.name.first).to.equal(null);
        
        //Add the second variable
        const vid = 3;
        state = game(state, actions.addVariable(0, 1, actions.VARIABLETYPE.RESULT, vid));
        result = state.variables[result_id];
        expect(state.sections[0].decleared_variables.result[0]).to.equal(vid);
      });      
      it('should select the output variable', () => {
        //Adding a variable
        //Should add the variable id into output variable array,
        //and add the variable id into the input variable array of the next section
        var vid = 1;
        state = game(state, actions.addVariable(0, 1, actions.VARIABLETYPE.OUTPUT, vid));
        expect(state.sections[0].decleared_variables.output[0]).to.equal(vid);
        expect(state.sections[1].decleared_variables.input[0]).to.equal(vid);
      });
    });
    describe('When player name a variable', () => {
      let state = null;
      beforeEach(()=>{
        state = immutable.fromJS(game(mockup.gamestate, {})).toJS();
      });      
      it('should change variable name', () => {
        state = game(state, actions.nameVariable(1, 'first', 7));
        expect(state.variables[7].name.first).to.equal(1);
        state = game(state, actions.nameVariable(2, 'middle', 7));
        expect(state.variables[7].name.middle).to.equal(2);
        state = game(state, actions.nameVariable(1, 'last', 7));
        expect(state.variables[7].name.last).to.equal(1);
      });
    });
    describe('When player open a section', () => {
      let state = null;
      beforeEach(()=>{
        state = immutable.fromJS(game(mockup.gamestate, {})).toJS();
      });       
      it('should show section content', () => {
        expect(state.sections[0].is_question_opened).to.equal(false);
        state = game(state, actions.openSection(0, actions.SECTIONTYPE.QUESTION));
        expect(state.sections[0].is_question_opened).to.equal(true);
        
        state = game(state, actions.openSection(1, actions.SECTIONTYPE.QUESTION));
        state = game(state, actions.openSection(1, actions.SECTIONTYPE.OPERATION));
        state = game(state, actions.openSection(1, actions.SECTIONTYPE.OUTPUT));
        expect(state.sections[1].is_input_opened).to.equal(false);
        expect(state.sections[1].is_question_opened).to.equal(true);
        expect(state.sections[1].is_operation_opened).to.equal(true);
        expect(state.sections[1].is_result_opened).to.equal(false);
        expect(state.sections[1].is_output_opened).to.equal(true);
      });
    });
    describe('When player select or change an operation method', () => {
      let state = null;
      beforeEach(()=>{
        state = immutable.fromJS(game(mockup.gamestate, {})).toJS();
        state.sections[0].decleared_variables.question = {0:1, 1:2}; //value of v[1] = 5, v[2] = 6
        state.sections[0].decleared_variables.operation = {0:1, 1:2}; //value of v[1] = 5, v[2] = 6
        state.sections[0].decleared_variables.result = {0:3} //default is null
        state.variables = computeResults(0, state.sections, state.variables, state.operations);
      });
      it('should return null if no operation has been selected', () => {
        expect(state.sections[0].operation).to.be(null);
        expect(state.variables[3].value).to.equal(null);
      });
      it('should return 11 if ADDITION operation has been selected', () => {
        state = game(state, actions.selectOperation(0, 0))
        expect(state.sections[0].operation).to.be(0);
        expect(state.variables[3].value).to.equal(11);
      });
      it('should return -1 if SUBTRACTION operation has been selected', () => {
        state = game(state, actions.selectOperation(0, 1));
        expect(state.sections[0].operation).to.be(1);
        expect(state.variables[3].value).to.equal(-1);
      });
    });
    describe('When player removes a variable', () => {
      let state = null;
      beforeEach(()=>{
        //Setup testing enviroment
        state = immutable.fromJS(game(mockup.gamestate, {})).toJS();
        state.sections[0].decleared_variables.question = {0:1, 1:null, 3:7};  //1 is 5, 7 is null
        state.sections[0].decleared_variables.operation = {0:1, 1:7};
        state.sections[0].decleared_variables.result = {0:3};  //3 is result, default vaule is null
        state.sections[0].decleared_variables.output = {0:1, 1:3};
        state.sections[0].operation = 0;
        
        state.sections[1].decleared_variables.input = {0:1, 1:3};
        state.sections[1].decleared_variables.operation = {0:1, 4:4}; //4 is 2
        state.sections[1].decleared_variables.result = {0:5}; //5 is result, default value is 5+2=7
        state.sections[1].decleared_variables.output = {0:1, 1:5, 2:3};
        state.sections[1].operation = 0;
        
        state.sections[2].decleared_variables.input = {0:1, 1:5, 2:3};
        state.sections[2].decleared_variables.operation = {0:1, 1:5, 2:3}; 
        state.sections[2].decleared_variables.result = {0:6}; //result is 5+7+null=null
        state.sections[2].operation = 0;
        state.variables = computeResults(0, state.sections, state.variables, state.operations);
      });
      
      it('should output nulls as initial mocked result', () => {
        expect(state.variables[6].value).to.equal(null);
        expect(state.variables[3].value).to.equal(null);
      });
      it('should remove the question variable and update result', () => {
        //Remove an pre-decleared variable
        //should remove the variable id from question variable array
        expect(state.variables[3].value).to.equal(null);
        state = game(state, actions.removeVariable(0,4,actions.VARIABLETYPE.QUESTION));
        expect(state.sections[0].decleared_variables.question[3]).to.equal(null);
        expect(state.variables[3].value).to.equal(5);
        
        state = game(state, actions.addVariable(0,5,actions.VARIABLETYPE.QUESTION));
        expect(state.sections[0].decleared_variables.question[4]).to.equal(8);
        state = game(state, actions.removeVariable(0,5,actions.VARIABLETYPE.QUESTION));
        expect(state.sections[0].decleared_variables.question[4]).to.equal(null);

        //should remove all the variable ids from the following sections
        //and update reaults
        state = game(state, actions.removeVariable(0,1,actions.VARIABLETYPE.QUESTION));
        expect(state.sections[2].decleared_variables.input[0]).to.equal(null);
        expect(state.sections[2].decleared_variables.operation[0]).to.equal(null);
        expect(state.variables[6].value).to.equal(2)
      });
      it('should remove the operation variable and update result', () => {
        //Remove an validated variable (number)
        //should remove the variable id from operation variable array
        expect(state.variables[3].value).to.equal(null);
        state = game(state, actions.removeVariable(0,2,actions.VARIABLETYPE.OPERATION));
        expect(state.variables[3].value).to.equal(5);
        
        //should remove all the variables from the following sections
        //and update results
        state = game(state, actions.removeVariable(1,5,actions.VARIABLETYPE.OPERATION));
        expect(state.variables[6].value).to.equal(15);
      });
      it('should remove the result variable and update result', () => {
        //Remove an pre-decleared variable
        //should remove the variable id from question variable array
        expect(state.variables[3].value).to.equal(null);
        state = game(state, actions.removeVariable(0,1,actions.VARIABLETYPE.RESULT));
        expect(state.sections[0].decleared_variables.result[0]).to.equal(null);
        expect(state.variables[6].value).to.equal(12);
      });
      it('should remove the output variable and update result', () => {
        //Remove an output variable (number)
        state = game(state, actions.removeVariable(0,1,actions.VARIABLETYPE.OUTPUT));
        expect(state.sections[0].decleared_variables.question[0]).to.equal(1);

        //should also remove all the variables from the following sections
        //and update results
        expect(state.sections[2].decleared_variables.input[0]).to.equal(null);
        expect(state.variables[6].value).to.equal(null);
      });
    });
    describe('When player add a commnet on a variable', () => {
      let state = null;
      beforeEach(()=>{
        //Setup testing enviroment
        state = immutable.fromJS(game(mockup.gamestate, {})).toJS();
        state.sections[0].decleared_variables.output = {0:1, 1:2};
        state.sections[0].num_outputs = 2;
      });
      it('should add comment on the variable', () => {
        expect(state.variables[2].comment).to.equal(null);
        state = game(state, actions.editComment('This is the comment', 2));
        expect(state.variables[2].comment).to.equal('This is the comment');
      });
    });
  });
  describe('REALTIME', ()=>{
    describe('When receive a real-time update from Firebase', () => {
      let state = null;
      beforeEach(()=>{
        state = immutable.fromJS(game(mockup.gamestate, {})).toJS();
      });
      it('should convert variable objects to array ', () => {
        //Remove an output variable (number)
        state = game(state, actions.updateGameState(game_state_firebase_mockup));
        expect(state.sections[1].decleared_variables.operation).to.not.be.an('array');
        expect(state.sections[1].decleared_variables.operation[0]).to.equal(3);
        expect(state.variables).to.not.be.an('array');
        expect(state.variables[8].value).to.equal(null);
      });
    });
  });
});