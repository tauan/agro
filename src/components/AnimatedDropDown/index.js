import React, {useState, useEffect} from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import {View, Text} from 'react-native'

export default props => {
  const [listItems, setListItems] = useState([])
  const {
    listOptions = [], 
    defaultValue = [""], 
    onChangeItem = () => {} ,
    backgroundColor = "#fff",
    placeholder = "",
    marginTop = 15,
    width = "100%"
  } = props
  

  return (
    <DropDownPicker
        items={listOptions}
        
        containerStyle={{height: 50, marginTop, width}}
        style={{backgroundColor: 'transparent'}}
        itemStyle={{
            justifyContent: 'flex-start'
        }}
        dropDownStyle={{backgroundColor: '#fafafa'}}
        onChangeItem={item => onChangeItem(item.value) }
        placeholder={placeholder}
      />
    
)
}