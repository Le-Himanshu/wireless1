import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput,Image } from 'react-native';
import {Camera} from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        scannedBookID: '',
        scannedStudentID:"",
        buttonState: 'normal'
      }
    }

    getCameraPermissions = async (ID) =>{
      const {status} = await Camera.requestPermissionsAsync()
      
      this.setState({
        /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        buttonState: ID,
        scanned: false
      });
    }

    handleBarCodeScanned = async({type, data})=>{
const {buttonState}=this.state
if(buttonState==="BookID"){
  
  this.setState({
    scanned: true,
    scannedBookID: data,
    buttonState: 'normal'
  });
}    
else if(buttonState==="StudentID"){
  this.setState({
    scanned: true,
    scannedStudentID: data,
    buttonState: 'normal'
  });
}
    }

    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState !== "normal" && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }

      else if (buttonState === "normal"){
        return(
          <View style={styles.container}>

           <View>
             <Image source={require("../assets/booklogo.jpg")} style={{width:200,height:200}}/>
           </View>

              <View style={styles.inputView}>
                <TextInput style={styles.inputBox} placeholder="Book ID" value={this.state.scannedBookID}/>
                <TouchableOpacity
            onPress={this.getCameraPermissions("BookID")}
            style={styles.scanButton}>
            <Text style={styles.buttonText}>Scan</Text>
          </TouchableOpacity>              
              </View>
              <View style={styles.inputView}>
                <TextInput style={styles.inputBox} placeholder="Student ID" value={this.state.scannedStudentID}/>
                <TouchableOpacity
            onPress={this.getCameraPermissions("StudentID")}
            style={styles.scanButton}>
            <Text style={styles.buttonText}>Scan</Text>
          </TouchableOpacity>              
              </View>
              

          
        </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
       scanButton:{
      backgroundColor: '#66BB6A',
      width:50,
      borderWidth:1.5,
      borderLeftWidth:0,
      margin:10,
      padding:10,
      
    },
    buttonText:{
      fontSize: 20,
    },
     buttonText:{
       fontSize:15,
       textAlign:"center",
       marginTop:10,

     },
     inputView:{
       flexDirection:"row",
       margin:20,

     },
     inputBox:{
       width:200,
       height:40,
       borderWidth:1.5,
       borderRightWidth:0,
       fontSize:20,

     },
     
      
     
  });
