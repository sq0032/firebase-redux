import {game, computeResults} from '../app/js/reducers';
import * as actions from '../app/js/actions';
import immutable from 'immutable';
import expect from 'expect.js';

const mockup = {
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
          operation: [3],
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
        name: null
      },
      {
        vid: 1,
        value: 5,
        name: {
          first: "Mark's",
          middle: "colleted",
          last: "apples"
        }
      },
      {
        vid: 2,
        value: 6,
        name: null
      },
      {
        vid: 3,
        value: null,
        name: {
          first: "Mark's",
          middle: "total",
          last: "apples"
        }
      },
      {
        vid: 4,
        value: 2,
        name: null
      },
      {
        vid: 5,
        value: null,
        name: {
          first: "Seid's",
          middle: "total",
          last: "apples"
        }
      },
      {
        vid: 6,
        value: null,
        name: null
      },
      {
        vid: 7,
        value: null,
        name: null
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

describe('App', () => {
  describe('PLAN', () => {
    describe('When player sets a output number', () => {
      let state = null;
      beforeEach(() => {
        //Setup testing enviroment
        state = game(mockup.gamestate, {});
        state = immutable.fromJS(state);
        state = state.toJS();
        state.sections[0].decleared_variables.question = [1, null, null, 7];  //1 is 5, 7 is null
        state.sections[0].decleared_variables.operation = [1, 7];
        state.sections[0].decleared_variables.output = [3, 1];  //3 is result, default vaule is null
        state.sections[0].num_outputs = 2;
        
        state.sections[1].decleared_variables.input = [1, 3];
        state.sections[1].decleared_variables.operation = [1, 4]; //4 is 2
        state.sections[1].decleared_variables.output = [1, 5]; //5 is result, default value is 5+2=7
        state.sections[1].num_outputs = 2;
        
        state.sections[2].decleared_variables.input = [1, 5];
        state.sections[2].decleared_variables.operation = [1, 5]; //result is 5+7=12
        state.sections[2].num_outputs = 0;
        state.variables = computeResults(0, state.sections, state.variables);
      });
      it('should add more output slots if number increased', () => {
        expect(state.sections[0].num_outputs).to.equal(2);
        state = game(state, actions.setOutputNumber(0,3));
        expect(state.sections[0].num_outputs).to.equal(3);
      });
      it('should reduce slots and update new result when number decreased', () => {
        state = game(state, actions.setOutputNumber(0,0));
        expect(state.sections[0].decleared_variables.output).to.have.length(0);
        expect(state.variables[5].value).to.equal(2);
      });
    });
  });  
  describe('DO', () => {
    it('should return initial state', () => {
      expect(
        game(mockup.gamestate, {}).sections.length
      ).to.equal(3);
    });
    
    describe('When player adds a variable', () => {
      let state = null;
      beforeEach(()=>{
        state = game(mockup.gamestate, {});
      });
      it('should handle adding a question variable', () => {
        //Adding an pre-decleared variable
        //should add the variable id into question variable array
        var vid = state.sections[0].default_variables.question[1];
        state = game(state, actions.addVariable(0, 2, actions.VARIABLETYPE.QUESTION, vid));
        expect(state.sections[0].decleared_variables.question[1]).to.equal(vid);
        
        //Adding an non-pre-decleared variable
        //should create a new variable and add the id into question variable array
        var length = state.variables.length;
        vid = state.variables[length-1].vid;
        state = game(state, actions.addVariable(0, 5, actions.VARIABLETYPE.QUESTION, undefined));
        vid = vid+1;
        expect(state.variables.length).to.equal(length+1);
        expect(state.sections[0].decleared_variables.question[4]).to.equal(vid);
      });
      it('should handle selecting an operation variable and update result', () => {
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
      it('should handle selecting output variable', () => {
        //Adding a variable
        //Should add the variable id into output variable array,
        //and add the variable id into the input variable array of the next section
        var vid = 1;
        state = game(state, actions.addVariable(0, 1, actions.VARIABLETYPE.OUTPUT, vid));
        expect(state.sections[0].decleared_variables.output[0]).to.equal(vid);
        expect(state.sections[1].decleared_variables.input[0]).to.equal(vid);
      });
    });
    describe('When player removes a variable', () => {
      let state = null;
      beforeEach(()=>{
        //Setup testing enviroment
        state = game(mockup.gamestate, {});
        state = immutable.fromJS(state);
        state = state.toJS();
        state.sections[0].decleared_variables.question = [1, null, null, 7];  //1 is 5, 7 is null
        state.sections[0].decleared_variables.operation = [1, 7];
        state.sections[0].decleared_variables.output = [1, 3];  //3 is result, default vaule is null
        
        state.sections[1].decleared_variables.input = [1, 3];
        state.sections[1].decleared_variables.operation = [1, 4]; //4 is 2
        state.sections[1].decleared_variables.output = [1, 5]; //5 is result, default value is 5+2=7
        
        state.sections[2].decleared_variables.input = [1, 5];
        state.sections[2].decleared_variables.operation = [1, 5]; //result is 5+7=12
        state.variables = computeResults(0, state.sections, state.variables);
      });
      
      it('should output 12 as initial mocked result', () => {
        expect(state.variables[6].value).to.equal(12);
        expect(state.variables[3].value).to.equal(null);
      });
      it('should handle removing a question variable and update result', () => {
        //Remove an pre-decleared variable
        //should remove the variable id from question variable array
        expect(state.variables[3].value).to.equal(null);
        state = game(state, actions.removeVariable(0,4,actions.VARIABLETYPE.QUESTION));
        expect(state.variables[3].value).to.equal(5);
        
        //should remove all the variable ids from the following sections
        //and update reaults
        state = game(state, actions.removeVariable(0,1,actions.VARIABLETYPE.QUESTION));
        expect(state.sections[2].decleared_variables.input[0]).to.equal(null);
        expect(state.sections[2].decleared_variables.operation[0]).to.equal(null);
        expect(state.variables[6].value).to.equal(2)
      });
      it('should handle removing an operation variable and update result', () => {
        //Remove an validated variable (number)
        //should remove the variable id from operation variable array
        expect(state.variables[3].value).to.equal(null);
        state = game(state, actions.removeVariable(0,2,actions.VARIABLETYPE.OPERATION));
        expect(state.variables[3].value).to.equal(5);
        
        //should remove all the variables from the following sections
        //and update results
        state = game(state, actions.removeVariable(1,2,actions.VARIABLETYPE.OPERATION));
        expect(state.variables[6].value).to.equal(10);
      });
      it('should handle removing output variable and update result', () => {
        //Remove an output variable (number)
        state = game(state, actions.removeVariable(0,1,actions.VARIABLETYPE.OUTPUT));
        expect(state.sections[0].decleared_variables.question[0]).to.equal(1);

        //should also remove all the variables from the following sections
        //and update results
        expect(state.sections[2].decleared_variables.input[0]).to.equal(null);
        expect(state.variables[6].value).to.equal(2);
      });
    });
  });

});