import React, { useEffect, useState } from 'react'
import {View, Text, Animated, TouchableWithoutFeedback, Platform} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

export default props => {
  const {
    value = "",
    placeholder = "",
    onChangeDate = () => {},
    width = "100%",
    height = 50,
    color = "#333",
    placeholderColor = '#666',
    borderWidth = 1,
    borderColor = "#BDBDBD",
    borderRadius = 4,
    marginTop = 16,
    marginLeft = 8,
    size = 14,
  } = props
  const animation = new Animated.Value(value.length === 0 ? 0 : 100)
  useEffect(()=>{ checkValue() },[])
  const [showCalendar, setShowCalendar] = useState(false)
  const [date, setDate] = useState(new Date())
  const months = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"]
  const checkValue = () => {
    value !== "" ? (animatePlaceholder(100)): animatePlaceholder(0)
  }
  const animatePlaceholder = toValue => {
    Animated.timing(animation, {
      toValue,
      duration: 200,
      useNativeDriver: false
    }).start()
  }
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || value;
    // retorna 01/01/2000 por exemplo
    // const shortDate = `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`
    const onlyMonth = months[currentDate.getMonth()] //retorna o mes em maiusculo
    setShowCalendar(Platform.OS === 'ios')
    setDate(currentDate)
    onChangeDate(onlyMonth)
  }

  return (
    <TouchableWithoutFeedback onPress={() => {setShowCalendar(true)}}> 
      <View style={{
        width,
        height, 
        borderColor,
        borderWidth,
        borderRadius,
        marginTop,
        overflow: "hidden"
      }}>
        {/* placeholder */}
        
        <Animated.Text
          style={{
            position: 'absolute',
            fontSize: animation.interpolate({
              inputRange: [0, 100],
              outputRange: [size, 11],
            }),
            color: placeholderColor,
            marginLeft,
            lineHeight: size,
            marginTop: animation.interpolate({
              inputRange: [0, 100],
              outputRange: [(height / 2) - (size / 2), 3],
            }),
            opacity: animation.interpolate({
              inputRange: [0, 100],
              outputRange: [1, 0.6],
            }),
          }}>
          {props.placeholder}
        </Animated.Text>
        {/* Value */}
        <Text style={{
          height,
          lineHeight: size,
          color,
          padding: 0,
          paddingHorizontal: 8,
          paddingTop: 25,
        }}>{value !== "" ? value : " "}</Text>
        {showCalendar && (
        <DateTimePicker
          testID="dateTimePicker"
          is24Hour={true}
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
        
      </View>
    </TouchableWithoutFeedback>
  )
}