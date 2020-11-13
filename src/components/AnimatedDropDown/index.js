import React, { useState, useEffect, createRef } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { View, Text } from 'react-native'

export default props => {
  const {
    listOptions = [],
    onChangeItem = () => { },
    disabled = false,
    placeholder = "",
    marginTop = 15,
    width = "100%",
    defaultValue = ""
  } = props
  const [newDefaultValue, setNewDefaultValue] = useState([])

  useEffect(() => { setDefaultValue() },[listOptions])

  setDefaultValue = () => {
    if(listOptions[0] === undefined) return 
    const tempDefaultValue = listOptions.filter(item => item.value === defaultValue)
    //setNewDefaultValue(tempDefaultValue)
  }

  let textInput = React.createRef();
  return (
    <DropDownPicker
      ref={textInput}
      disabled={disabled}
      items={listOptions}
      defaultValue={newDefaultValue[0] === undefined ? '' : [`${newDefaultValue[0].label}]`]}
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