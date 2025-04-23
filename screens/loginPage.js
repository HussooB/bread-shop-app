import React from 'react'
import { View , Text , StyleSheet, Button, TouchableOpacity } from 'react-native'

export default function app(navigation){
  return (
    <View style={styles.Container}>
      <TouchableOpacity style={[styles.button,{backgroundColor:"blue"}]} >
        <Text style={[styles.buttonText,{color:'white'}]}>Login</Text>
      </TouchableOpacity>
      <View style={{marginTop:7}}/> 
      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Signup</Text>
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
    borderColor:"blue",
    borderWidth:0.4,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 24,
    
    
    justifyContent: "center",
    alignItems: "center"
    
  },
  buttonText: {
    color: 'blue',
    fontSize: 16,
    fontWeight: "bold"
    
  }
  }
)