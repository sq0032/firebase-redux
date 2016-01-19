const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';


function increment() {
  return {
    type: INCREMENT,
  }
}

dispatch(increment())