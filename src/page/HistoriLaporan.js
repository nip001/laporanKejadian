import React, { Component } from 'react'
import { View, Text,FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios';

export class HistoriLaporan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFlatList:{}
        }
    }

    componentDidMount() {
        if(this.props.isLogin){
            this.props.navigation.navigate('Home')
        }else{
            this.getData()
        }
    }

    getData(){
        axios.get('http://192.168.123.53:8080/laporan/')
        .then((response)=>{
            let data =response.data
            console.log(data)
            this.setState({dataFlatList:data})
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.dataFlatList}
                    keyExtractor={item=>parseInt(item.id)}
                    renderItem={({item})=>(
                        <Text>{item.name}</Text>
                    )}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    isLogin: state.LoginReducer.isLogin
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoriLaporan)
