import React, { Component, PropTypes } from 'react';
import { editComment } from '../../actions';
import { connect } from 'react-redux';

function select(state) {
  return {
    game: state.game,
    players: state.players,
    user: state.user
  }
}

@connect(select)
export default class CommentEditor extends Component {
  constructor(props){
    super(props);
    this.state = {
      is_editing: false,
      comment: this.props.comment
    }
  }
  openEditor() {
    this.setState({
      is_editing: true
    });
  }
  handleKeyPress(event) {
    console.log('handleKeyPress');
    console.log(event.keyCode);
    console.log(event.key);
    const {dispatch, vid} = this.props;
    const comment = this.state.comment;
    if (event.key == 'Enter'){
      dispatch(editComment(comment, vid));
      this.setState({
        is_editing: false
      })
    }
  }
  handleCommentChange(event) {
    this.setState({
      comment: event.target.value
    });
  }  
  render() {
    const {comment, game, user} = this.props;
    if (this.state.is_editing == false){
      return (
        <button onClick={this.openEditor.bind(this)}>
          //{comment}
        </button>
      )
    } else {
      return (
        <input
          value={this.state.comment}
          onKeyPress={this.handleKeyPress.bind(this)}
          onChange={this.handleCommentChange.bind(this)}>
        </input>
      )
    }
  }
}

CommentEditor.propTypes = {
}



const style = {
  base: {
    height: '75px',
    width: '75px',
    borderRadius: '50%',
    border: '1px solid black',
    margin: '0px 10px 0px 10px',
    textAlign: 'center',
    lineHeight: '75px',
    fontSize: '200%',
//    marginBottom: '50px',
    cursor: 'pointer',
    display: 'inline-block'
  },
}