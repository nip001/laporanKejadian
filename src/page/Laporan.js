import React, { Component } from 'react'
import { View, Text, TextInput,StyleSheet, Platform, Button, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';


export class Laporan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name:"",
            kejadian:"",
            alamat:"",
            keterangan:"",
            image:"https://asset.kompas.com/crops/7aeyQXv6hi9593Gh1ppQgPeSMkg=/0x8:1747x1172/750x500/data/photo/2020/11/26/5fbf40c4507ae.jpg",
            latitude:"",
            longitude:"",
            status:"",
            jam:"",
        }
    }

    componentDidMount(){
        this.getPermission()
        this.getLocation()
    }

    async getPermission(){
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    async pickImage(){
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          console.log(result);
          
          if (!result.cancelled) {
              console.log(result.uri)
              this.setState({image:result.uri})
          }
    }
    
    async getLocation(){
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        }
    
        let location = await Location.getCurrentPositionAsync({});
        console.log("Lokasinya adalah :" + JSON.stringify(location));

        this.setState({
            latitude: location.coords.latitude,
            longitude:location.coords.longitude
        })
    };

    handlerSubmit(){
        let date = new Date();
        this.setState({jam:date.getHours()+":"+date.getMinutes()})
        if(this.state.kejadian==="bencana"){
            this.setState({status:"bencana"})
        }else{
            this.setState({status:"kriminal"})
        }

        let formData = new FormData();
        formData.append('data',JSON.stringify(this.state))
        formData.append('file',{
            uri: this.state.image, //Your Image File Path
         })
        // formData.append('name',this.state.name);
        // formData.append('kejadian',this.state.kejadian);
        // formData.append('keterangan',this.state.keterangan);
        // formData.append('alamat',this.state.alamat);
        // formData.append('image',this.state.image);
        // formData.append('latitude',this.state.latitude);
        // formData.append('longitude',this.state.longitude);
        // formData.append('status',this.state.status);
        // formData.append('jam',this.state.jam);
        axios.post('http://192.168.123.53:8080/user/login/',formData,{headers:{'Content-Type': 'multipart/form-data'}})
        .then((response)=>{
            console.log(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    render() {
        return (
            <View style={styles.viewStyle}>
                <Text> Name </Text>
                <TextInput placeholder="masukan nama" onChangeText={(value)=>{this.setState({name:value})}}/>
                <Text> Kejadian </Text>
                <Picker
                    selectedValue={this.state.kejadian}
                    style={{ height: 50, width: 300 }}
                    onValueChange={(itemValue) => this.setState({ kejadian: itemValue })}>
                    <Picker.Item label="Perampokan" value="perampokan" />
                    <Picker.Item label="Bencana" value="bencana" />
                    <Picker.Item label="Pembunuhan" value="pembunuhan" />
                </Picker>
                
                <Text> Alamat </Text>
                <TextInput placeholder="masukan alamat" onChangeText={(value)=>{this.setState({alamat:value})}}/>
                <Text> Keterangan </Text>
                <TextInput placeholder="masukan keterangan" onChangeText={(value)=>{this.setState({keterangan:value})}}/>
                <Button title="Pick an image from camera roll" onPress={()=>{this.pickImage()}} />
                <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200,alignSelf:'center' }} />
                <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.handlerSubmit()}}><Text style={styles.textStyle}>Tambah Laporan</Text></TouchableOpacity>

            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Laporan)

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