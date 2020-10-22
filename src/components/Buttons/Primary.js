import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

const wDimensions = Dimensions.get('screen').width

export default (props) => {
  const {
    disabled = true,
    title,
    width = wDimensions - 60,
    height = 50,
    backgroundColor = "#07AC82",
    borderRadius = 4,
    marginTop = 16,
    color = "#fff",
    onPress = () => {}, 
    shadow = 0,
    elevation = shadow

  } = props
  return (
    <RectButton onPress={onPress} style={{ width, height, backgroundColor, borderRadius, marginTop, elevation,  }} enabled={disabled}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color }}>{title}</Text>
      </View>
    </RectButton>
  )
}