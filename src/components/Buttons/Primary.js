import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

const wDimensions = Dimensions.get('screen').width

export default (props) => {
  const {
    title,
    width = wDimensions - 80,
    height = 55,
    backgroundColor = "#07AC82",
    borderRadius = 4,
    marginTop = 16,
    color = "#fff",
    shadow = 0,
    elevation = shadow

  } = props
  return (
    <RectButton onPress={() => { }} style={{ width, height, backgroundColor, borderRadius, marginTop, elevation }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color }}>{title}</Text>
      </View>
    </RectButton>
  )
}