import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function  Welcome() {
  return (
    <View>
      <Text style = {styles.wel}> Welcome to our App</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  wel: {
    fontSize: 20,
    textAlign: "center",
    margin: 7,
    fontWeight: "bold",
    marginBottom: 20, 
  },
});