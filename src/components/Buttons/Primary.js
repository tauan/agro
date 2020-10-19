import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

export default (props) => {
  const { 
    title, 
    width = "100%",
    height = 50,
    backgroundColor = "#07AC82",
    borderRadius = 4,
    marginTop = 16,
    color = "#fff",
    shadow = 0,
    elevation = shadow

  } = props
  return(
    <TouchableOpacity onPress={()=> {}}  style={{width, height, backgroundColor, borderRadius, marginTop, elevation}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color}}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}