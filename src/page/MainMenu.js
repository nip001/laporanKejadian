import React, { Component } from 'react'
import { View, Text, TouchableOpacity,StyleSheet, Image } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { LoginAction } from '../Redux/Action'

class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.state={
            counter:1,
        }
    }

    componentDidMount(){
        if(!this.props.dataRedux.isLogin){
            this.props.navigation.navigate('Home')
        }
    }

    handleSignOut(){
        alert("Anda berhasil sign out")
        this.props.LoginAction(false,"isLogin")
        this.props.navigation.navigate("Home")
    }

    render() {
        return (
            <View style={styles.viewStyle}>
                <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.props.navigation.navigate('Laporan')}}>
                    <Text style={styles.textStyle}>Laporan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle}>
                    <Text style={styles.textStyle}>Histori Laporan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle}>
                    <Text style={styles.textStyle}>Map Kejadian</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.handleSignOut()}}>
                    <Text style={styles.textStyle}>Sign Out</Text>
                </TouchableOpacity>


                <TouchableOpacity
                onPress={()=>{
                    if(this.state.counter === 3){
                        this.setState({counter:1})
                        this.props.navigation.navigate('Laporan')
                    }else{
                        let count = this.state.counter
                        this.setState({counter:count+1})
                    }
                }}>
                    <Image style={{width:200,height:200,alignSelf:'center'}}
                        source={{uri:'https://cdn.iconscout.com/icon/free/png-256/emergency-call-2221248-1852309.png'}}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    dataRedux:state.LoginReducer
})

const mapDispatchToProps = {
    LoginAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu)

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