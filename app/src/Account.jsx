import { StyleSheet, Text, View , Linking } from 'react-native'
import React from 'react'

export default function Account() {
  return (
    <View style={styles.account}>
      <Text style={styles.account}> Have an Account &nbsp;
        <Text style={[styles.acc, styles.link]}  onPress={()=>Linking.openURL ('#')}>Login</Text> 

      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    account:{
        alignItems: "center",
        marginTop: 5,
        fontSize: 15,
    },
    acc:{
        fontWeight: "bold",
    },
    link:{
        color: "lightblue",
    },
});