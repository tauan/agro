import React, { useEffect } from 'react'
import { View, Dimensions } from 'react-native';
import { Picker } from '@react-native-community/picker'

const wDimensions = Dimensions.get('screen').width

export default (props) => {
  const {
    listOptions = [],
    backgroundColor = 'transparent',
    color = '#333',
    width = wDimensions - 60,
    height = 50,
    borderRadius = 4,
    marginTop = 16,
    borderWidth = 1,
    borderColor = "#BDBDBD",
    value = 'Sexo',
    onValueChange = () => { }
  } = props;

  return (
    <View style={{
      width,
      marginTop,
      backgroundColor,
      height,
      borderRadius,
      lineHeight: 14,
      color,
      padding: 0,
      paddingHorizontal: 8,
      paddingTop: 15,
      borderWidth,
      borderColor,
      justifyContent: 'center',
    }}>
      <Picker
        style={{
          marginBottom: 10,
          color: value === 'Sexo' ? '#666' : 'black',
          transform: [{ scaleX: 0.88 }, { scaleY: 0.88 }],
          left: -32, width: '122%'
        }}
        selectedValue={value}
        onValueChange={onValueChange}>
        <Picker.Item label="Sexo" value="Sexo" />
        {listOptions.map(item => <Picker.Item key={item} label={item} value={item} />)}
      </Picker>
    </View>
  )
}