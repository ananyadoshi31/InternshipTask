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

export default function Login({navigation})
{
    

    const onPressHandlerSignUp=()=>{
        navigation.navigate('CreateAccount')
        
      }
      const onPressHandlerloginUser=()=>{
        navigation.navigate('Main')
        
      }

  
    //   const navigation = useNavigation()
      const [email,setEmail] = useState('')
      const[password,setPassword]=useState('')
      const loginUser = async (email,password)=>{
        try{
            await firebase.auth().signInWithEmailAndPassword(email,password)
           
        }catch(error){
            alert(error.message)
        }
      }

      const forgotpass =()=>{
        firebase.auth().sendPasswordResetEmail(email)
        .then(()=>{
            alert("Password reset email has been sent")
        }).catch((error)=>{
            alert(error)
        })
      }

return (
    <ScrollView style={{height:2000}}>
      <View style={styles.container}>
        <View style={styles.textview}>
            <Text style={styles.text}>
                Login
          </Text>
          <Text style={styles.text1}>
                Please login continue
          </Text>
        </View>
     
        <View style={styles.outer}>
        
        
        </View>
        <View style={styles.inner}>
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
            <TouchableOpacity
               onPress={()=>{
                forgotpass()
               }}  
            >
                <Text 
                    style={{
                        fontSize:15,
                 
                        color:'#000000',
                        left:65,
                        bottom:-25

                    }}
                >
                    Forgot Password
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginbutton}
                // onPress={()=>loginUser(email,password)}  
                onPress={onPressHandlerloginUser}
            >
                <Text style={styles.loginbuttontext}>Login</Text>
            </TouchableOpacity>
            <Text 
                style={{
                    fontSize:15,
                
                    color:'#000000',
                    bottom:-70,
                    textAlign:'center',
                    left:-40,

                  }}
            >
                New User? 
            </Text>
            <Pressable 
                onPress={onPressHandlerSignUp} 
            >
                <Text style={styles.text2}>Sign Up</Text>
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
    fontSize:45,
    color:'#000000',
    // fontFamily:'Sarabun',
    textAlign:'center',
    top:10,
    right:70,
    fontWeight:'bold'
   },
   
   input:{
    top:20,
    width:'70%',
    height:50,
    backgroundColor: '#ffffff',
    borderColor: '#5A5A5A',
    borderWidth: 1,
    alignSelf:'center',
    borderRadius:15,
    

   },
   credential:{
    top:40,
    padding:20,
    left:45,
    fontSize:22,
    color:'#000000',
    // fontFamily:'Sarabun',
   },
   loginbutton:{
    height:48,
    width:146,
    backgroundColor:'#D9D9D9',
    borderRadius:15,
    bottom:-50,
    left:130
   },
   loginbuttontext:{
    fontSize:20,
    textAlign:'center',
    color:'#000000',
    // fontFamily:'Sarabun',
    top:4
   },
   text1:{
    color:"#000000",
    textAlign:'center',
    paddingTop:20,
    right:50,
    fontSize:15
},
text2:{
    color:"#89CFF0",
    textAlign:'center',
    paddingTop:45,
    left:50,
    fontSize:15,
    fontWeight:'bold'
}
  })