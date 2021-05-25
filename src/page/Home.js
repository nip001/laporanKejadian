import React, { Component } from 'react'
import { Text, TouchableOpacity, View,StyleSheet } from 'react-native'

import { connect } from 'react-redux'

export class Home extends Component {
    handlerLogin(){
        if(this.props.isLogin){
            this.props.navigation.navigate('MainMenu')
        }else{
            this.props.navigation.navigate('Login')
        }
    }
    render() {
        return (
            <View>
                <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.handlerLogin()}}>
                    <Text style={styles.textStyle}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.props.navigation.navigate('Register')}}>
                    <Text style={styles.textStyle}>Register</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    isLogin:state.LoginReducer.isLogin    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)


const styles=StyleSheet.create({
    buttonStyle:{
        borderWidth:10,
        borderColor:"red",
        margin:20
    },

    textStyle:{
        textAlign:'center',
    }
})
