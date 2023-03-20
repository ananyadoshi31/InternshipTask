import React, { useState,useEffect } from "react";
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

  } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { firebase } from '../../config';
// import { useFonts } from 'expo-font';

export default function CreateAccount({navigation})
{
    const onPressHandlerLogin=()=>{
        navigation.navigate('Login')
        
      }

      const [email,setEmail] = useState('')
      const[password,setPassword]=useState('')
      const[name,setName]=useState('')
      const registerUser = async (email,password,name)=>{
            await firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(()=>{
                firebase.auth().currentUser.sendEmailVerification({
                    handleCodeInApp: true,
                    url:'https://fir-task-51a69.firebaseapp.com',
                })
                .then(()=>{
                    alert('verification email sent')
                }).catch((error)=>{
                    alert(error.message)
                })
                .then(()=>{
                    firebase.firestore().collection('users')
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name,
                        email,
                    })
                })
                .catch((error)=>{
                    alert(error.message)
                })
            }) 
            .catch((error)=>{
                alert(error.message)
            })
      }


return (
 <ScrollView style={{height:2000}}>
      <View style={styles.container}>
        <View style={styles.textview}>
            <Text style={styles.text}>
                Create Account
          </Text>
          <Text style={styles.text1}>
                Create account to begin
          </Text>
        </View>

        <View style={styles.outer}>
        </View>
        <View style={styles.inner}>
        <Text style={styles.credential}>
                Name:
            </Text>
            <TextInput
                style={styles.input}
                placeholder=" Name"
                autoCapitalize="none"
                onChangeText={(name)=>setName(name)}
                autoCorrect={false}
            />
            <Text style={styles.credential}>
                Email:
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={(email)=>setEmail(email)}
                placeholder=" Email"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Text style={styles.credential}>
                Password:
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={(password)=>setPassword(password)}
                placeholder=" Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.loginbutton}
            onPress={()=>registerUser(email,password,name)}
            
            >
                <Text style={styles.loginbuttontext}>Register</Text>
            </TouchableOpacity>
            <Text 
                style={{
                    fontSize:15,
                 
                    color:'#000000',
                    bottom:-20,
                    textAlign:'center',
                    left:-40

                  }}
            >
                Already have an account ?
            </Text>
            <Pressable 
                onPress={onPressHandlerLogin} 
            >
                <Text style={styles.text2}>Login</Text>
            </Pressable>
        </View>
       </View>
       </ScrollView>
    )
}

  const styles = StyleSheet.create({
   container:{
    flex:1,
    backgroundColor:'#89CFF0'

   },
   textview:{
    top:200
   },
   outer:{
    backgroundColor:'#D9D9D9',
    height:568,
    top:250,
    borderRadius:40,
    width:'100%'
   },
   inner:{
    backgroundColor:'#ffffff',
    height:514,
    bottom:260,
    borderRadius:40,
    width:'100%'
   },
   text:{
    fontSize:40,
    color:'#000000',
    textAlign:'center',
    top:10,
    right:10,
    fontWeight:'bold'
   },
  
   input:{
    top:-15,
    width:'70%',
    height:50,
    backgroundColor: '#ffffff',
    borderColor: '#5A5A5A',
    borderWidth: 1,
    alignSelf:'center',
    borderRadius:15,


   },
   credential:{
    padding:15,
    left:50,
    fontSize:20,
    color:'#000000',
   },
   loginbutton:{
    height:48,
    width:146,
    backgroundColor:'#D9D9D9',
    borderRadius:15,
    bottom:-10,
    left:130
   },
   loginbuttontext:{
    fontSize:20,
    textAlign:'center',
    color:'#000000',
    top:4
   },
   text1:{
    color:"#000000",
    textAlign:'center',
    paddingTop:20,
    right:75,
    fontSize:15
},
text2:{
    color:"#89CFF0",
    textAlign:'center',
    left:90,
    fontSize:15,
    fontWeight:'bold',
    bottom:5
}
  })