import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default (props) => {
  const {
    enabled = true,
    marginRight = 0,
    title,
    width,
    height = 50,
    backgroundColor = "#55cb93",
    borderRadius = 4,
    marginTop = 16,
    color = "#fff",
    onPress = () => { },
    shadow = 0,
    elevation = shadow
  } = props
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={{ width, height, backgroundColor, borderRadius, marginTop, elevation, marginRight }} enabled={enabled}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color }}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}