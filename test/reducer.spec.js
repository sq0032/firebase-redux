import {game} from '../app/js/reducers';
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
        var vid = 2;
        state = game(state, actions.addVariable(0, 1, actions.VARIABLETYPE.OPERATION, vid));
        var result_id = state.sections[0].default_variables.result[0];
        var result = state.variables[result_id];
        expect(state.sections[0].decleared_variables.operation[0]).to.equal(vid);
        expect(result.value).to.equal(6);
        
        vid = 1;
        state = game(state, actions.addVariable(0, 2, actions.VARIABLETYPE.OPERATION, vid));
        expect(state.sections[0].decleared_variables.operation[1]).to.equal(vid);
        expect(result.value).to.equal(11);
        
        
        //Adding an non-validated variable (null)
        //Should add the variable id into operation variable array and update answer value (null)
      });
      xit('should handle adding/selecting output variable', () => {
        //Adding a variable
        //Should add the variable id into output variable array,
        //and add the variable id into input variable array of the next section
      });
    });
    
    describe('REMOVE_VARIABLE', () => {
      xit('should handle removing a question variable', () => {
        //Adding an pre-decleared variable
        //should add the variable id into question variable array
        
        //Adding an non-pre-decleared variable
        //should create a new variable and add the id into question variable array
      });
      xit('should handle removing an operation variable', () => {
        //Adding an validated variable (number)
        //Should add the variable id into operation variable array and update answer value (number)
        
        //Adding an non-validated variable (null)
        //Should add the variable id into operation variable array and update answer value (null)
      });
      xit('should handle removing output variable', () => {
        //Adding a variable
        //Should add the variable id into output variable array,
        //and add the variable id into input variable array of the next section
      });
    });
  });
});