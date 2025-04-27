import { StyleSheet, Image,View } from 'react-native'
import React from 'react'

export default function Logo() {
  return (
    <View style={styles.img}>
        <Image
            source={require('@/assets/images/log1.jpeg')}
            style={{ width:375,height : 300 }}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    img:{
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }

})