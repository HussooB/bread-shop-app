import React from 'react'
import { View , Text , StyleSheet, Button, TouchableOpacity } from 'react-native'

export default function app(navigation){
  return (
    <View style={styles.Container}>
      <TouchableOpacity style={[styles.button,{backgroundColor:"blue"}]} >
        <Text style={[styles.buttonText,{color:'white',marginLeft:3}]}>Login</Text>
      </TouchableOpacity>
      <View style={{marginTop:7}}/> 
      <TouchableOpacity style={styles.button} >
        <Text style={[styles.buttonText,{marginLeft:22}]}>Signup</Text>
      </TouchableOpacity>
      </View>
  )
}

const styles=StyleSheet.create(
  {
    Container: {
      flex:1,
      backgroundColor: "#fff",
      justifyContent:"center",
      alignItems:"center"
    },
  button: {
    width:3,
    
    borderColor:"blue",
    borderWidth:0.4,
    borderRadius:5,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 24,
    
    
    justifyContent: "center",
    alignItems: "center"
    
  },
  buttonText: {
    color: 'blue',
    fontSize: 17,
    fontWeight: "bold"
    
  }
  }
)