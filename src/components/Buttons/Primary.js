import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

const wDimensions = Dimensions.get('screen').width

export default (props) => {
  const {
    disabled = true,
    marginRight = 0,
    title,
    width = wDimensions,
    height = 50,
    backgroundColor = "#008b54",
    borderRadius = 4,
    marginTop = 16,
    color = "#fff",
    onPress = () => { },
    shadow = 0,
    elevation = shadow
  } = props
  return (
    <RectButton onPress={onPress} style={{ zIndex: 5,width, height, backgroundColor, borderRadius, marginTop, elevation, marginRight }} enabled={disabled}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color }}>{title}</Text>
      </View>
    </RectButton>
  )
}