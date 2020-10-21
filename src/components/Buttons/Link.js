import React from 'react'
import { View, TouchableOpacity, Text, Dimensions } from 'react-native'

const wDimensions = Dimensions.get('screen').width

export default (props) => {
  const { 
    title, 
    width = wDimensions - 60,
    height = 55,
    backgroundColor = "transparent",
    borderWidth = 0,
    borderColor = 'transparent',
    borderRadius = 4,
    marginTop = 0,
    color = "#666",
    shadow = 0,
    elevation = shadow,
    onPress = ()=>{}

  } = props
  return(
    <View style={{width, height, backgroundColor, borderRadius, marginTop, elevation, borderWidth, borderColor}}>
      <TouchableOpacity onPress={onPress}  style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color}}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}