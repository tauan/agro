import React, { useState } from 'react';
import { TextInput, View, Animated } from 'react-native';
import Validator from './ultils/validator'

export default props => {
  const {
    backgroundColor = '#fff',
    textAlignVertical = 'center',
    autoCapitalize = 'none',
    size = 14,
    color = '#333',
    keyboardType = 'default',
    width = '100%',
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
    maxLength = 100,
    multiline = false,
    editable = true
  } = props;
  const [isValid, setIsValid] = useState(true)

  const animation = new Animated.Value(value === undefined || value === null ? 0 : (value.length === 0 ? 0 : 100));

  const animateText = value => {
    if (value === undefined || value === null || value.length === 0) {
      Animated.timing(animation, {
        toValue: 100,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };
  const finishEdit = text => {
    verifyTextValue(text)
    if (required !== false) {
      text.length === 0 ? setIsValid(false) : setIsValid(true)
    }
    if (valid !== "none")
      setIsValid(Validator({ valid, value }))

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
    <View style={{
      width, marginTop, backgroundColor: editable ? backgroundColor : "#efefef", height,
      borderRadius
    }}>

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
        editable={editable}
        style={{
          backgroundColor: "transparent",
          height,
          borderRadius,
          lineHeight: 14,
          color,
          padding: 0,
          paddingHorizontal: 8,
          paddingTop: textAlignVertical == 'top' ? 25 : 15,
          borderWidth,
          borderColor: isValid ? borderColor : "#f00",
        }}
        keyboardType={keyboardType}
        onFocus={() => animateText(value)}
        textAlignVertical={textAlignVertical}
        secureTextEntry={secureTextEntry}
        onEndEditing={(e) => finishEdit(e.nativeEvent.text)}
        autoCapitalize={autoCapitalize}
        maxLength={maxLength}
        value={value}
        multiline={multiline}
        onChangeText={e => {
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
