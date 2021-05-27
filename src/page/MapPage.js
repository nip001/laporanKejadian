import React, { Component } from 'react'
import { View, Text,StyleSheet,Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

export class MapPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataFlatList:[
                {
                    name:""
                },
                {
                    name:""
                },
            ]
        }
    }

    componentDidMount() {
        // if(this.props.isLogin){
        //     this.props.navigation.navigate('Home')
        // }else{
            this.getData()
        // }
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


    renderMarker(){
        console.log(this.state.dataFlatList)
        return this.state.dataFlatList.map((data, index) => {
            return (<Marker
              key={index}
              coordinate={{ latitude : parseFloat(data.latitude) , longitude :  parseFloat(data.longitude) }}
            />)
          })
    }

    render() {
        return (
            <View style={styles.container}>
              <MapView style={styles.map} 
              
                initialRegion={{
                    latitude: -6.240786,
                    longitude: 106.8557614,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>
                    {this.renderMarker()}
                 </MapView>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    isLogin: state.LoginReducer.isLogin
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MapPage)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });