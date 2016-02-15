import {game, computeResults} from '../app/js/reducers';
//import {TYPE} from '../app/js/actions';
import * as actions from '../app/js/actions';
import immutable from 'immutable';
import expect from 'expect.js';
//var reducer = require('./ app/js/reducers');


describe('Reducers', () => {
  describe('sections', () => {
    it('should return initial state', () => {
      expect(
        game(undefined, {}).sections.length
      ).to.equal(3);
    });
    
    describe('ADD_VARIABLE', () => {
      var state = null;
      beforeEach(()=>{
        state = game(undefined, {});
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
        state = game(state, actions.addVariable(0, 5, actions.VARIABLETYPE.QUESTION, undefined));
        vid = state.variables[length].vid;
        expect(state.variables.length).to.equal(length+1);
        expect(state.sections[0].decleared_variables.question[4]).to.equal(vid);
      });
      it('should handle adding/selecting an operation variable', () => {
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
        expect(state.sections[0].decleared_variables.operation[1]).to.equal(vid);
        expect(result.value).to.equal(11);
        //Update result values in every following sections
        var result_id_2 = state.sections[1].default_variables.result[0];
        expect(state.variables[result_id_2].value).to.equal(11);
        
        
        //Adding an non-validated variable (null)
        //Should add the variable id into operation variable array and update answer value (null)
        vid = 0;
        state = game(state, actions.addVariable(0, 3, actions.VARIABLETYPE.OPERATION, vid));
        expect(state.sections[0].decleared_variables.operation[2]).to.equal(vid);
        expect(result.value).to.equal(null);
      });
      it('should handle adding/selecting output variable', () => {
        //Adding a variable
        //Should add the variable id into output variable array,
        //and add the variable id into the input variable array of the next section
        var vid = 1;
        state = game(state, actions.addVariable(0, 1, actions.VARIABLETYPE.OUTPUT, vid));
        expect(state.sections[0].decleared_variables.output[0]).to.equal(vid);
        expect(state.sections[1].decleared_variables.input[0]).to.equal(vid);
      });
    });
    describe('REMOVE_VARIABLE', () => {
      var state = null;
      beforeEach(()=>{
        //Setup testing enviroment
        state = game(undefined, {});
        state.sections[0].decleared_variables.question = [1, null, null, 7];  //1 is 5, 7 is null
        state.sections[0].decleared_variables.operation = [1, 7];
        state.sections[0].decleared_variables.output = [1, 3];  //3 is result, default vaule is null
        
        state.sections[1].decleared_variables.input = [1, 3];
        state.sections[1].decleared_variables.operation = [1, 4]; //4 is 2
        state.sections[1].decleared_variables.output = [1, 5]; //5 is result, default value is 5+2=7
        
        state.sections[2].decleared_variables.input = [1, 5];
        state.sections[2].decleared_variables.operation = [1, 5]; //result is 5+7=12
        computeResults(0, state.sections, state.variables);
      });
      
      it('should output 12 as initial result', () => {
        expect(state.variables[6].value).to.equal(12);
        expect(state.variables[3].value).to.equal(null);
      });
      it('should handle removing a question variable', () => {
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
      it('should handle removing an operation variable', () => {
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
      it('should handle removing output variable', () => {
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