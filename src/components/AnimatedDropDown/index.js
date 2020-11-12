import React, { useState, useEffect } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { View, Text } from 'react-native'

export default props => {
  const {
    listOptions = [],
    onChangeItem = () => { },
    placeholder = "",
    marginTop = 15,
    width = "100%",
  } = props

  return (
    <DropDownPicker
      items={listOptions}
      defaultValue={''}
      containerStyle={{ height: 50, marginTop, width }}
      style={{ backgroundColor: '#fff'}}
      itemStyle={{
        justifyContent: 'flex-start'
      }}
      dropDownStyle={{ backgroundColor: '#fafafa' }}
      onChangeItem={item => onChangeItem(item.value)}
      placeholder={placeholder}
    />

  )
}