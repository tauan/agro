import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

export default (props) => {
  const { 
    title, 
    width = "100%",
    height = 55,
    backgroundColor = "transparent",
    borderRadius = 4,
    marginTop = 0,
    color = "#666",
    shadow = 0,
    elevation = shadow,
    onPress = ()=>{}

  } = props
  return(
    <View style={{width, height, backgroundColor, borderRadius, marginTop, elevation}}>
      <TouchableOpacity onPress={onPress}  style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color}}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}