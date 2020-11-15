import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker';

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

  return (
    <DropDownPicker
      disabled={disabled}
      items={listOptions}
      defaultValue={listOptions.length > 0 && defaultValue}
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