import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';

export default (props) => {
  const {
    placeholder = "",
    width = "100%",
    listOptions = [],
    marginTop = 16,
    defaultValue,
    borderColor = "#BDBDBD",
    onChangeItem = function () { },
    color = "#666"
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
      containerStyle={{ height: 50, marginTop, width }}
      itemStyle={{
        justifyContent: 'flex-start',
      }}
      style={{ backgroundColor: '#fff', borderColor, paddingLeft: 4 }}
      dropDownStyle={{ backgroundColor: '#ffffff' }}
      onChangeItem={onChangeItem}
      labelStyle={{color}}
    />
  )
}