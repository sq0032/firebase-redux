//import libraries
import Firebase from 'firebase';
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

//import React components
//import LoginForm from './login-form';
//import Game from './game';
//
////imoprt Flux actions
//import actions from './actions';
//
//window.onbeforeunload = function(){
////  var r = confirm( "Do you want to leave?" );
////  if (r == true) {
////       //I will call my method
////  }
////  else {
////      return false;
////  }
////  return "Do you want to leave?"
//  actions.leave();  
//}
//
//class App extends React.Component{
//  constructor(props){
//    super(props);
//    this.state = {
//        user: null,
//        players: []
//    };
//  }
//  componentDidMount(){
////    actions.connectServer();
//    $(window)
//      .on('JOIN_GAME', {this:this}, this.on_joinGame)
//      .on('UPDATE_PLAYER_LIST', {this:this}, this.on_updatePlayerList);
//    
//    //Initial file fetch (passing in root id)
//  }
//  componentWillUnmount(){
//    $(window)
//      .off('JOIN_GAME', this.on_joinGame)
//      .off('UPDATE_PLAYER_LIST', this.on_updatePlayerList);
//  }
//  on_updatePlayerList(event){
//    const that = event.data.this;
//    console.log(event.players);
//    that.setState({players:event.players});    
//  }
//  on_joinGame(event){
//    const that = event.data.this;
//    that.setState({user:event.user});
//  }
//  render(){
//    if(!this.state.user){
//      return (
//        <LoginForm/>
//      );
//    }else{
//      return (
//        <Game user={this.state.user} players={this.state.players}/>
//      );    
//    }
//  }
//};

ReactDOM.render(
  <p>Good</p>,
  document.getElementById('app')
);