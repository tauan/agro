import React, { useState, useEffect, createRef } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { View, Text } from 'react-native'

export default props => {
  const {
    listOptions = [],
    onChangeItem = () => { },
    defaultValue = null,
    disabled = false,
    placeholder = "",
    marginTop = 15,
    width = "100%",
  } = props

  let dropDown = createRef();
  let controller;

  useEffect(()=>{
    // controller.selectItem(defaultValue)
  },[])

  return (
    <DropDownPicker
      ref={dropDown}
      controller={instance => controller = instance}
      disabled={disabled}
      items={listOptions}
      defaultValue={''}
      containerStyle={{ height: 50, marginTop, width }}
      style={{ backgroundColor: disabled ? '#F2F2F2' : '#fff', borderColor: '#BDBDBD' }}
      itemStyle={{
        justifyContent: 'flex-start'
      }}
      dropDownStyle={{ backgroundColor: '#fafafa' }}
      onChangeItem={item => onChangeItem(item.value)}
      placeholder={placeholder}
    />

  )
}