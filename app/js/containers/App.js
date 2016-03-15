import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { GameScreens } from '../actions';

import Screen from '../screens/Screen';
import Nav from '../components/Nav';
import VideoChat from '../components/VideoChat';

import 'aws-sdk/dist/aws-sdk';
const AWS = window.AWS;
// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:d8e6ce93-9af3-4b2a-ac8a-65a8c804ff75',
});

// Initialize the Cognito Sync client

//AWS.config.credentials.get(function(){
//   var syncClient = new AWS.CognitoSyncManager();
//   syncClient.openOrCreateDataset('myDataset', function(err, dataset) {
//      dataset.put('myKey', 'myValue', function(err, record){
//         dataset.synchronize({
//            onSuccess: function(data, newRecords) {
//                // Your handler code here
//            }
//         });
//      });
//   });
//});
  
class App extends Component {
    
  renderScreen() {
    const offset = this.props.gameScreen.cur_screen;
    const Screens = GameScreens.map((screen, index)=>{
      if (index >= offset - 1 && index <= offset + 1 ){
        return (
          <Screen screen={screen} offset={-offset+index} key={screen}/>
        );
      }
    });
    console.log('renderScreen');
    return Screens;
  }
  render() {
    const Screen = this.renderScreen();
    const { dispatch, gameScreen } = this.props
    return (
      <div>
        <Nav/>
        {Screen}
        <VideoChat/>
      </div>
    )
  }
}

const style = {
  screen: {
    left:'0px',
    right:'1px',
    top:'100px',
    bottom: '0px',
    border: '1px solid black',
    position: 'absolute',
  }
}

App.propTypes = {
}

function select(state) {
  return {
    gameScreen: state.gameScreens,
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App)