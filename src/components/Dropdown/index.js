import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';

export default (props) => {
  const {
    placeholder = "",
    listOptions = [],
    marginTop = 16,
    defaultValue,
    borderColor = "#BDBDBD",
    onChangeItem = function () { }
  } = props;

  const items = listOptions.map(item => {
    return {
      label: item, value: item,
      icon: () => {}
    }
  })

  return (
    <DropDownPicker
      items={items}
      placeholder={placeholder}
      defaultValue={defaultValue}
      containerStyle={{ height: 50, marginTop }}
      itemStyle={{
        justifyContent: 'flex-start'
      }}
      style={{ backgroundColor: '#fff', borderColor }}
      dropDownStyle={{ backgroundColor: '#ffffff' }}
      onChangeItem={onChangeItem}
    />
  )
}