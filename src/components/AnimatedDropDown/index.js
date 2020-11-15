import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
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

  const [selectedItem, setSelectedItem] = useState(null)
  let controller;

  useEffect(() => {
    controller.selectItem(selectedItem)
  }, [defaultValue])

  return (
    <DropDownPicker
      controller={instance => controller = instance}
      disabled={disabled}
      items={listOptions}
      defaultValue={listOptions.length > 0 ? defaultValue : null}
      containerStyle={{ height: 50, marginTop, width }}
      style={{ backgroundColor: disabled ? '#F2F2F2' : '#fff', borderColor: '#BDBDBD' }}
      itemStyle={{
        justifyContent: 'flex-start'
      }}
      dropDownStyle={{ backgroundColor: '#fafafa' }}
      onChangeItem={item => { onChangeItem(item.value) }}
      placeholder={placeholder}
    />

  )
}