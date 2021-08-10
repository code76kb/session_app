import React from 'react';
import { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import {generateSlots} from "../actions/Actions";

class HomeScreen extends Component {


  onclickBookAppointment=()=>{
    this.props.dispatch(generateSlots());
    this.props.navigation.navigate("Slots");
  }

  render(){
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.btnBookAppoint} onPress={this.onclickBookAppointment}>
          <Text style={styles.btnTxtBookAppoint}>{"Book Appointment"}</Text>
        </TouchableOpacity>
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

  btnTxtBookAppoint:{
    color:'white'
  },

});

const mapStateToProps=(state)=>{
  return {
  }
}

export default connect(mapStateToProps)(HomeScreen);