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
    //console.log(item)
    if(item.label && item.value) {
      console.log(item)
      return {
        label: item.label, value: item.value,
        icon: () => item.icon ? <Icon name={item.icon} size={18} color="#900" /> : {}
      }
    }else {
      //console.log(`O picker encontrou problemas ao receber o array no item: ${item}`)
      return { label: "checkConsole", value: "checkConsole", icon: () => {} }
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