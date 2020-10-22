import React, {useEffect, useState} from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { RectButton } from 'react-native-gesture-handler'

export default props => {
  const {
    navigation,
    height = 50,
    backgroundColor = "#fff",
    title = "",
    textAlign = "center",
    color = "#666"
  } = props
  const [back, setBack] = useState(false)
  useEffect(()=>{
    (async function(){
      const result = await navigation.canGoBack()
      result === true ? setBack(true) : setBack(false)
    })()
  })
  return (
    <View style={{width: "100%", height, backgroundColor, flexDirection: "row", alignItems:"center", zIndex: 7}}>
      <View style={{width: 50, height: "100%"}}>
        {back === true && <RectButton onPress={()=>navigation.goBack()} style={{
          height: "100%",
          alignItems: "center", 
          justifyContent: "center",
          width: "100%"
        }}>
          <Icon name="arrow-back" size={20} color={color} />
        </RectButton>}
      </View>
      
      <Text style={{
        flex: 1,
        paddingRight: 50,
        fontFamily: "Roboto",
        textAlign,
        color
      }}>{title}</Text>
    </View>
  )
}