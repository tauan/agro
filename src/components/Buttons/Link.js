import React from 'react'
import { View, TouchableOpacity, Text, Dimensions } from 'react-native'

const wDimensions = Dimensions.get('screen').width

export default (props) => {
  const {
    title,
    width = '100%',
    height = 55,
    backgroundColor = "transparent",
    borderWidth = 0,
    borderColor = 'transparent',
    borderRadius = 0,
    marginTop = 0,
    color = "#666",
    shadow = 0,
    elevation = shadow,
    onPress = () => { },
    style = {}

  } = props
  return (
    <View style={[style, { width, height, backgroundColor, borderRadius, marginTop, elevation, borderWidth, borderColor }]}>
      <TouchableOpacity onPress={onPress} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color }}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}