import axios from 'axios';
import React, { Component } from 'react'
import { Text, TouchableOpacity, View,StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            email:"",
            phone:"",
            address:"",
        }
    }

    simpanData(){
        axios.post('http://192.168.123.53:8080/user/register/',this.state)
        .then((response)=>{
            alert(response.data)
            this.props.navigation.navigate('Home')
        })
        .catch((error)=>{
            console.log("ada error sebagai berikut : "+error)
        })
    }



    render() {
        return (
            <View style={styles.viewStyle}>
                <Text> Name </Text>
                <TextInput placeholder="masukan nama" onChangeText={(value)=>{this.setState({name:value})}}/>
                <Text> Email </Text>
                <TextInput placeholder="masukan email" onChangeText={(value)=>{this.setState({email:value})}}/>
                <Text> Phone </Text>
                <TextInput placeholder="masukan phone" onChangeText={(value)=>{this.setState({phone:value})}}/>
                <Text> Address </Text>
                <TextInput placeholder="masukan Address" onChangeText={(value)=>{this.setState({address:value})}}/>
                <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.simpanData()}}><Text style={styles.textStyle}>Submit</Text></TouchableOpacity>
            </View>
        )
    }
}

export default Register

const styles = StyleSheet.create({
    viewStyle:{
        margin:20,
    },

    buttonStyle:{
        borderWidth:10,
        borderColor:"red",
        margin:20
    },

    textStyle:{
        textAlign:'center',
    }


})