import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TextInput,
  ImageBackground,
  Button,
  Pressable,
  TouchableOpacity,

  // CustomButton,
} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
// import {firebase} from '../../config';
// import storage from '@react-native-firebase/storage';
// import {storage} from '../../config';
// import DocumentPicker from 'react-native-document-picker';
// import firebase from 'firebaser/compat/app'
 
import firebase from 'firebase/compat';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from "react-native-gesture-handler";


export default function Main({ navigation }) {



  const [image, setImage] = useState(null)
     const [uploading, setUploading] = useState(false) 

     const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4,3],
          quality: 1
      });
      const source = {uri: result.uri}
      console.log(source)
      setImage(source)
  }; 

  const uploadImage = async () => {
      setUploading(true)
      const response = await fetch(image.uri)
      const blob = response.blob()
      const filename = image.uri.substring(image.uri.lastIndexOf('/')+1)
      var ref = firebase.storage().ref().child(filename).put(blob)
      // const ref = ref(storage, 'Pictures/' + Date.now());
      try {
          await ref;
      } catch (e){
          console.log(e)
      }
      setUploading(false)
      Alert.alert(
          'Photo uploaded!'
      );
      setImage(null);
  } 


  return (


    <View style={styles.container}>

      <View style={{
        backgroundColor: '#89CFF0',
        height: "18%",
        borderBottomRightRadius: 100,
      }}>

      </View>


      <Image style={styles.photo} source={require('../../assets/doc.png')} />
      <Text style={styles.title}>
        Upload File
      </Text>

      <Pressable style={styles.button1}
        onPress={pickImage}

      >

        <Text style={styles.stylebutton1}>CLICK HERE TO UPLOAD</Text>
      </Pressable>
      <Pressable
      style={{
        // backgroundColor:'#'
        alignItems:'center',
        alignContent:'center',
        marginTop:20,
      }}
        onPress={uploadImage}
      >
        <Text
          style={{fontSize:15}}
        >Upload Image</Text>
      </Pressable>
      {/* <Button title='Upload Image' style={{width:'30%'}} onPress={uploadImage}/> */}
      {/* {!uploading ? <Button title='Upload Image' onPress={uploadImage} /> : <ActivityIndicator size={'small'} color='black' />} */}
      {/* {image && <Image source={{ uri: image }} style={{ width: 170, height: 200 }} />} */}




      <TouchableOpacity
        // onPress={() => { firebase.auth().signOut() }}
        style={styles.button}
      >
        <Text style={styles.signouttxt}>Sign out</Text>
      </TouchableOpacity>

    </View>



  )
}
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: "#000000",
    textAlign: 'center',
    fontSize: 45,
    marginTop: 80,
    fontWeight: 'bold'

  },
  photo: {
    alignItems: 'center',
    alignSelf: 'center',
    top: 30,
    height: 150,
    width: 120
  },
  img: {
    height: '100%',
    width: '100%'
  },
  stylebutton1: {
    color: "#ffffffff",
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'


  },

  button1: {
    textAlign: 'left',
    backgroundColor: "#89CFF0",
    fontSize: 36,
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%',
    width: '80%',

    marginTop: 80,
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },


  login: {
    backgroundColor: '#ffffff',

  },
  loginbutton: {
    color: '#000000',
    fontSize: 22,
    width: 100,
    height: 45,
    left: 330,
    top: 50,

  },
  button: {
    marginTop: 50,
    height: 50,
    width: 150,
    backgroundColor: '#89CFF0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    textAlign: 'center',
    alignSelf:'center',
    alignItems:'center',
    bottom: -10,

  },

  signouttxt: { fontSize: 22, fontWeight: 'bold'}

})