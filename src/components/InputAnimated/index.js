import React, { useState } from 'react';
import { TextInput, View, Animated, Dimensions } from 'react-native';
import Validator from './ultils/validator'

const widthDimension = Dimensions.get("screen").width

export default props => {
  const {
    backgroundColor = '#fff',
    size = 14,
    color = '#333',
    keyboardType = 'default',
    width = widthDimension - 60,
    height = 50,
    borderRadius = 4,
    marginTop = 16,
    placeholderColor = '#666',
    secureTextEntry = false,
    borderWidth = 1,
    borderColor = "#BDBDBD",
    value,
    onChangeText = () => { },
    required = false,
    valid = "none",
    multiline = false
  } = props;
  const [isValid, setIsValid] = useState(true)

  const animation = new Animated.Value(value === undefined ? 0 : (value.length === 0 ? 0 : 100));

  const animateText = value => {
    if (value === undefined || value.length === 0) {
      Animated.timing(animation, {
        toValue: 100,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };
  const finishEdit = text => {
    verifyTextValue(text)
    if(required!==false){
      text.length === 0 ? setIsValid(false) : setIsValid(true)
    }
    if(valid !== "none") 
      setIsValid(Validator({valid, value}))
      
  }
  const verifyTextValue = e => {
    if (e.length === 0) {
      Animated.timing(animation, {
        duration: 200,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  };
  return (
    <View style={{ width, marginTop, backgroundColor, height,
      borderRadius}}>
      
      <Animated.Text
        style={{
          position: 'absolute',
          fontSize: animation.interpolate({
            inputRange: [0, 100],
            outputRange: [size, 11],
          }),
          color: isValid ? placeholderColor : "#f00",
          marginLeft: 8,
          lineHeight: size,
          marginTop: animation.interpolate({
            inputRange: [0, 100],
            outputRange: [(height / 2) - (size / 2), 3],
          }),
          opacity: animation.interpolate({
            inputRange: [0, 100],
            outputRange: [1, 0.6],
          }),
        }}>
        {props.placeholder}
      </Animated.Text>
      <TextInput
        style={{
          backgroundColor: "transparent",
          height,
          borderRadius,
          lineHeight: 14,
          color,
          padding: 0,
          paddingHorizontal: 8,
          paddingTop: 15,
          borderWidth,
          borderColor: isValid ? borderColor : "#f00"
        }}
        keyboardType={keyboardType}
        onFocus={() => animateText(value)}
        secureTextEntry={secureTextEntry}
        onEndEditing={(e) => finishEdit(e.nativeEvent.text)}
        autoCapitalize="none"
        value={value}
        multiline={multiline}
        onChangeText={e=>{
          onChangeText(e)
          e.length === 0 ? setIsValid(false) : setIsValid(true)
        }}
      />
    </View>
  );
};
const InputAnimated = (props) => {
  const { AnimatedPlaceholder = true } = props;
  if (AnimatedPlaceholder) {
    return AnimatedInput(props);
  } else {
    return <></>;
  }
};

/*
    animatedPlaceholder: Habilita ou desabilita o texto animado
    placeholderColor: Cor do texto do placeholder
    placeholder: Texto a ser exibido
    backgroundColor: Cor de fundo
    color: Cor do texto
    height: Altura do box em PX
    width: Largura do box
*/
