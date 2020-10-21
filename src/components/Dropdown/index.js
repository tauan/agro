import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';

export default (props) => {
  const {
    listOptions = [],
    marginTop = 16,
    defaultValue,
    borderColor = "#BDBDBD",
    onChangeItem = function () { }
  } = props;

  const items = listOptions.map(item => {
    return {
      label: item, value: item,
      icon: () => item === 'Feminino'
        ? <Icon name="md-female-outline" size={18} color="magenta" />
        : <Icon name="md-male-outline" size={18} color="blue" />
    }
  })

  return (
    <DropDownPicker
      items={items}
      placeholder="Sexo"
      defaultValue={defaultValue}
      containerStyle={{ height: 50, marginTop }}
      itemStyle={{
        justifyContent: 'flex-start'
      }}
      style={{ backgroundColor: '#fff', borderColor }}
      dropDownStyle={{ backgroundColor: '#ffffff' }}
      onChangeItem={onChangeItem()}
    />
  )
}