import moment from 'moment';
import React from 'react';
import { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { setBookingSlotIndex } from '../actions/Actions';

class SlotsScreen extends Component {

  constructor(props){
    super(props)
    this.state={
      slots:[],
    }
  }

  componentDidMount(){
    this.setState({slots:this.props.slots.list});
  }

  componentWillReceiveProps(newProps){
    if(this.props.updateTime != newProps.updateTime){
      this.setState({slots:newProps.slots.list});
    }
    this.props = newProps;
  }


  onClickBookSlot=(index)=>{
    this.props.dispatch(setBookingSlotIndex({index:index}));
    this.props.navigation.navigate("Booking");
  }

  render(){
    return (
      <View style={{flex:1,padding:8}}>
        <FlatList
          style={{ flex: 1,}}
          data={this.state.slots}
          extraData={this.state}
          renderItem={({item,index})=>{
            return(
              <View style={{flexDirection:'row',alignItems:"center",justifyContent:'space-around',backgroundColor:'white', borderColor:'black', borderWidth:1, paddingVertical:6, marginBottom:10}}>
                
                <View style={{ alignItems:'flex-start',}}>
                  <Text style={{fontSize:20,color:'black',textAlign:'center', paddingVertical:6}}>{`SLOT: ${index+1}`}</Text>

                  <View style={{alignItems:'center'}}>
                      <Text style={{fontSize:16, color:'black'}}>{`OPENING-TIME: ${moment(item.openingTime).format("YYYY-MM-DD hh:mm")}`}</Text>
                      <Text style={{fontSize:16, color:'black'}}>{`CLOSING-TIME: ${moment(item.closingTime).format("YYYY-MM-DD hh:mm")}`}</Text>
                  </View>
                </View>

                {!item.bookingStatus?
                  <TouchableOpacity style={{backgroundColor:"black", padding:10, height:40, alignItems:'center'}}
                  onPress={()=>this.onClickBookSlot(index)}>
                    <Text style={{fontSize:16, color:'white'}}>{"BOOK"}</Text>
                  </TouchableOpacity>
                :
                  <Text style={{fontSize:16, color:'red'}}>{"BOOKED"}</Text>
                } 
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}>
        </FlatList>
      </View>
    );
  }
}


const mapStateToProps=(state)=>{
  return {
    slots:state.appReducer.slots,
  }
}
export default connect(mapStateToProps)(SlotsScreen);