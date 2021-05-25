import axios from 'axios'
import React, { Component } from 'react'
import { View, Text ,StyleSheet, TouchableOpacity} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { LoginAction } from '../Redux/Action'

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state={
            name:"",
            phone:""
        }
    }

    handleLogin(){
        axios.get('http://192.168.123.53:8080/user/login/',{
            params:{
                name:this.state.name,
                phone:this.state.phone,
            }
        })
        .then((response) =>{
            let data=response.data;
            if(data !== ""){
                this.props.LoginAction(true,"isLogin")
                this.props.LoginAction(data,"dataUser")
                alert("Login berhasil")
                this.props.navigation.navigate('MainMenu')
            }else{
                alert("login gagal")
                this.props.LoginAction(false,"isLogin")
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    render() {
        return (
            <View style={styles.viewStyle}>
                <Text> Name </Text>
                <TextInput placeholder="masukan nama" onChangeText={(value)=>{this.setState({name:value})}}/>
                <Text> Phone </Text>
                <TextInput placeholder="masukan phone" onChangeText={(value)=>{this.setState({phone:value})}}/>
                <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.handleLogin()}}><Text style={styles.textStyle}>Login</Text></TouchableOpacity>

            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    dataMapping:state.LoginReducer
})

const mapDispatchToProps = {
    LoginAction   
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

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