import React, {useState, useEffect} from 'react'
import DropDownPicker from 'react-native-dropdown-picker';

export default props => {
  const [listItems, setListItems] = useState([])
  const {
    list, 
    activeItem = "", 
    onChangeItem = () => {} 
  } = props
  
  useEffect(()=> {
    checkList()
  },[])

  const checkList = () => { list ? (Array.isArray(list) ? setListItems(list) : setListItems([list])) : setListItems([{label: 'Incorrect', value: 'incorrect', icon: () => {}}]) }

  return (
    <DropDownPicker
      items={listItems}
      defaultValue={activeItem}
      containerStyle={{height: 50}}
      style={{backgroundColor: '#fafafa'}}
      itemStyle={{
          justifyContent: 'flex-start'
      }}
      dropDownStyle={{backgroundColor: '#fafafa'}}
      onChangeItem={item => onChangeItem(item.value) }
    />
)
}