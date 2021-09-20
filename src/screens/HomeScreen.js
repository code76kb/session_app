import React from 'react';
import { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  AppState,
} from 'react-native';
import { connect } from 'react-redux';
import {toggleSession, setSession, markBackGroundTime} from "../actions/Actions";

const RESET_WINDOW = 1000 * 60 * 10 // unit:MilliSecond

class HomeScreen extends Component {

  constructor(props){
    super(props)
    this.appStateChangeListener;
  }


  componentDidMount(){
   this.appStateChangeListener = AppState.addEventListener('change',this.onAppStateChange);
  }

  componentWillUnmount(){
    this.appStateChangeListener && this.appStateChangeListener.remove();
  }

  onAppStateChange=(newAppState)=>{
    if(newAppState === 'background'){
      this.props.dispatch(markBackGroundTime(Date.now()))
    }
    else if(newAppState === 'active'){
      if( (Date.now()- this.props.backGroundTime) > RESET_WINDOW ){
        console.log("HOME : Logout..");
        this.props.dispatch(setSession(false));
      }
    }
  }

  toggleSwitch=()=>{
    this.props.dispatch(toggleSession());
  }

  render(){
    return (
      <View style={styles.container}>
          <Text style={styles.txtSessionStatus}>{`Is session active :${this.props.isSessionActive}`}</Text>
          <Switch 
               onValueChange={this.toggleSwitch}
               value={this.props.isSessionActive}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },

  btnBookAppoint:{
    backgroundColor:"black", 
    paddingHorizontal:16, 
    paddingVertical:16
  },

  txtSessionStatus:{
    color:'black',
    fontWeight:'bold',
    fontSize:18
  },
});

const mapStateToProps=(state)=>{
  return {
    isSessionActive:state.appReducer.isSessionActive,
    backGroundTime:state.appReducer.backGroundTime,
  }
}

export default connect(mapStateToProps)(HomeScreen);