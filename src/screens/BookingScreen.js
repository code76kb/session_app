import React from 'react';
import { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { updateSlots } from '../actions/Actions';

class BookingScreen extends Component {

  constructor(props){
    super(props)
    this.state={
      name:"",
      email:"",
      phone_no:"",
    }
  }

  onClickBook=()=>{
    //ToDo: Input Validation 
    //
    let slots  = this.props.slots.list;
    let userInfo = {
      name:this.state.name,
      email:this.state.email,
      phone_no:this.state.phone_no
    }
    slots[this.props.bookingSlotIndex.index].bookedFor = userInfo;
    slots[this.props.bookingSlotIndex.index].bookingStatus = true;
    this.props.dispatch(updateSlots(slots));
    this.props.navigation.goBack(null);
  }

  render(){
    return (
      <View style={{flex:1, padding:16, backgroundColor:'white', justifyContent:'center'}}>

        <TextInput style = {styles.input}
                  underlineColorAndroid = "transparent"
                  placeholder = {"Name"}
                  autoCapitalize = "none"
                  onChangeText={(value)=>this.setState({name:value})}
        />

        <TextInput style = {styles.input}
                  keyboardType={"email-address"}
                  underlineColorAndroid = "transparent"
                  placeholder = {"Email"}
                  autoCapitalize = "none"
                  onChangeText={(value)=>this.setState({email:value})}
        />

        <TextInput style = {styles.input}
                  keyboardType={"phone-pad"}
                  underlineColorAndroid = "transparent"
                  placeholder = {"Phone-No"}
                  autoCapitalize = "none"
                  onChangeText={(value)=>this.setState({phone_no:value})}
        />

        <TouchableOpacity style={{padding:16, backgroundColor:'black', alignItems:'center'}}
          onPress={this.onClickBook}>
          <Text style={{color:'white'}}>{"BOOK NOW"}</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderWidth: 1,
    fontSize :16,
    marginBottom:16,
  },
});

const mapStateToProps=(state)=>{
  return {
    slots: state.appReducer.slots,
    bookingSlotIndex: state.appReducer.bookingSlotIndex
  }
}

export default connect(mapStateToProps)(BookingScreen);