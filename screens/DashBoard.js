import React from 'react'

import {View , Text , StyleSheet, Image, TextInput, Button, ScrollView, TouchableOpacity} from 'react-native'


export default function dashboard(){
    return(
        <ScrollView>
            <View style={styles.Container}>
                <Text style={styles.Text}>DashBoard</Text>
                <View style={
                    {
                        flexDirection:'row',
                        justifyContent:'space-between'
                    }
                }>
                    <View style={
                        {
                            backgroundColor:"#EFF1FE",
                            marginTop: 20,
                            width:155, 
                            height:85,
                            
                            elevation: 10,
                            
                            justifyContent:"center",
                            paddingTop: 5,
                            paddingBottom:5,
                            paddingHorizontal:10

                        }}>
                        
                        <Text style={{fontSize:30}}>🍞</Text>
                        <Text style={{fontWeight:"bold"}}>Production</Text>
                        <Text style={{fontWeight:"bold"}}>150</Text>
                    </View>

                    <View style={
                        {
                            backgroundColor:"#EFF1FE",
                            marginTop: 20,
                            width:160, 
                            height:85,
                            
                            elevation: 10,
                            
                            justifyContent:"center",
                            paddingTop: 5,
                            paddingBottom:5,
                            paddingHorizontal:10

                        }}>
                        
                        <Text style={{fontSize:30}}>🚛</Text>
                        <Text style={{fontWeight:"bold"}}>Delivered</Text>
                        <Text style={{fontWeight:"bold"}}>80</Text>
                        </View>

                        
                </View>

                <View style={
                    {
                        flexDirection:'row',
                        justifyContent:'space-between'
                    }
                }>
                    <View style={
                        {
                            backgroundColor:"#EFF1FE",
                            marginTop: 20,
                            width:155, 
                            height:85,
                            
                            elevation: 10,
                            
                            justifyContent:"center",
                            paddingTop: 5,
                            paddingBottom:5,
                            paddingHorizontal:10

                        }}>
                        
                        <Text style={{fontSize:30}}>🏬</Text>
                        <Text style={{fontWeight:"bold"}}>Sold</Text>
                        <Text style={{fontWeight:"bold"}}>60</Text>
                    </View>

                    <View style={
                        {
                            backgroundColor:"#EFF1FE",
                            marginTop: 20,
                            width:160, 
                            height:85,
                            
                            elevation: 10,
                            
                            justifyContent:"center",
                            paddingTop: 5,
                            paddingBottom:5,
                            paddingHorizontal:10

                        }}>
                        
                        <Text style={{fontSize:30}}>🗑</Text>
                        <Text style={{fontWeight:"bold"}}>Wasted</Text>
                        <Text style={{fontWeight:"bold"}}>10</Text>
                        </View>

                        
                </View>

                <View style={
                        {
                            backgroundColor:"#EFF1FE",
                            marginTop: 20,
                            marginBottom: 40,
                            width:330, 
                            height:85,
                            
                            elevation: 10,
                            
                            justifyContent:"center",
                            paddingTop: 5,
                            paddingBottom:5,
                            paddingHorizontal:10

                        }}>
                        
                        <Text style={{fontSize:30}}>📈</Text>
                        <Text style={{fontWeight:"bold"}}>Total Earnings</Text>
                        <Text style={{fontWeight:"bold"}}>$540</Text>
                        </View>


                    <Text style={
                        {
                            fontSize:22,
                            fontWeight:"bold"
                        }
                    }>Add Production</Text>

                    <TextInput 
                        style={styles.Input} 
                        placeholder='Enter number of breads produced'
                        
                        />
                    <TextInput 
                        style={[styles.Input, {height:80,marginBottom:10}]} 
                        placeholder='Add notes (optional)'
                        
                        />
                    <Button  title="Save Production" />
                    <View style={{marginTop:30}}/>

                    <Text style={
                        {
                            fontSize:22,
                            fontWeight:"bold"
                        }
                    }>Delivery Entries</Text>

                    <TextInput 
                        style={styles.Input} 
                        placeholder='Enter location name'
                        
                        />
                    <TextInput 
                        style={[styles.Input, {marginBottom:10}]} 
                        placeholder='Enter quantity Delivered'
                        
                        />
                    <Button style={{padding:30}} title="Add Delivery" />
                    <View style={{marginTop:20}}/>

                    <Text style={
                        {
                            fontSize:22,
                            fontWeight:"bold"
                        }
                    }>Past Deliveries</Text>
                    <View style={{marginTop:13}}/>
                    <View style={{backgroundColor:"#EFF1FE",elevation:10,marginBottom:10,height:50,padding:10,justifyContent:"center"}} >
                        <Text style={{fontWeight:'bold'}}>Hotel Sunrise - 30 breads</Text>
                    </View>
                    <View style={{backgroundColor:"#EFF1FE",elevation:10,marginBottom:10,height:50,padding:10,justifyContent:"center"}} >
                        <Text style={{fontWeight:'bold'}}>Shop Delight - 40 breads</Text>
                    </View>
                    <View style={{marginTop:20}}/>



                    <Text style={
                        {
                            fontSize:22,
                            fontWeight:"bold"
                        }
                    }>Shop Sales</Text>

                    
                    <TextInput 
                        style={[styles.Input, {marginBottom:7}]} 
                        placeholder='Enter quantity sold'
                        
                        />
                    <Button  title="Calculate Earnings" />
                    <View style={{marginTop:7}}/>


                    <View style={{backgroundColor:"#EFF1FE",elevation:10,marginBottom:10,height:50,padding:10,justifyContent:"center"}} >
                        <Text style={{fontWeight:'bold'}}>Total Earning : $180</Text>
                    </View>

                    <Text style={
                        {
                            fontSize:22,
                            fontWeight:"bold"
                        }
                    }>Summary</Text>
                    <View style={{marginTop:0}}/>

                    
                    <View style={
                        {
                            backgroundColor:"#EFF1FE",
                            marginTop: 10,
                            
                            height:110,
                            
                            elevation: 10,
                            
                            justifyContent:"center",
                            paddingTop: 5,
                            paddingBottom:5,
                            paddingHorizontal:10

                        }}>
                        
                        <Text style={{fontWeight:"bold"}}>Produced : 150</Text>
                        <Text style={{fontWeight:"bold"}}>Sold : 110</Text>
                        <Text style={{fontWeight:"bold"}}>Wasted : 10</Text>
                        <Text style={{fontWeight:"bold"}}>Earning : $540</Text>
                    </View>
                    <View style={{marginTop:20}}/>

                    <Image style={styles.Image} source={require("../assets/pieChart.jpg")} />




                    <Text style={
                        {
                            fontSize:22,
                            fontWeight:"bold"
                        }
                    }>History</Text>
                    <View style={{marginTop:13}}/>
                    <View style={{backgroundColor:"#EFF1FE",elevation:10,marginBottom:10,height:50,padding:10,justifyContent:"center"}} >
                        <Text style={{fontWeight:'bold'}}>2023-10-01: 150 produced, 110 sold</Text>
                    </View>
                    <View style={{backgroundColor:"#EFF1FE",elevation:10,marginBottom:10,height:50,padding:10,justifyContent:"center"}} >
                        <Text style={{fontWeight:'bold'}}>2023-10-02: 160 produced, 120 sold</Text>
                    </View>
                    <View style={{marginTop:20}}/>


                    <Text style={
                        {
                            fontSize:22,
                            fontWeight:"bold"
                        }
                    }>Settings</Text>


                    <View style={{marginTop:7}}/>
                    <TouchableOpacity style={styles.button} >
                            <Text style={styles.buttonText}>Profile</Text>
                        </TouchableOpacity>
                        <View style={{marginTop:7}}/>

                        <View style={{marginTop:7}}/>
                    <TouchableOpacity style={styles.button} >
                            <Text style={styles.buttonText}>Password</Text>
                        </TouchableOpacity>
                        <View style={{marginTop:7}}/>

                        <View style={{marginTop:7}}/>
                    <TouchableOpacity style={styles.button} >
                            <Text style={styles.buttonText}>Currency</Text>
                        </TouchableOpacity>
                        <View style={{marginTop:7}}/>

                        <View style={{marginTop:7}}/>
                    <TouchableOpacity style={styles.button} >
                            <Text style={styles.buttonText}>Backup Options</Text>
                        </TouchableOpacity>
                        <View style={{marginTop:7}}/>






            </View>
            </ScrollView>
    )
}


const styles=StyleSheet.create(
    {
        Container:{
            backgroundColor: "white",
            flex:1,
            paddingTop:50,
            paddingHorizontal:15
        },

        Text:{
            fontSize:28,
            fontWeight:"bold"
        },
        
        Image: {
            width:100,
            height:100
        },

        Input:{
            borderWidth:1,
            borderColor: "#777",
            marginTop:10,
            marginBotton:10,
            padding:8,
            
        },
        button: {
            borderColor:"black",
            borderWidth:1,
            backgroundColor: 'white',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
            
            justifyContent: "center",
            alignItems: "center"
            
          },
          buttonText: {
            color: 'black',
            fontSize: 16,
            fontWeight: "bold"
            
          },
    }
)