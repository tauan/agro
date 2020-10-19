/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { TextInput, View, Animated} from 'react-native';

const AnimatedInput = (props) => {
  const {
    backgroundColor = 'transparent',
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
    borderColor = "#BDBDBD"
  } = props;

  const animation = new Animated.Value(0);

  const animateText = () => {
    Animated.timing(animation, {
      toValue: 100,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  const verifyTextValue = e => {
    if (e.length === 0) {
      Animated.timing(animation, {
        duration: 100,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  };
  return (
    <View style={{width, marginTop}}>
      <TextInput
        style={{
          backgroundColor,
          height,
          borderRadius,
          lineHeight: 14,
          color,
          padding: 0,
          paddingHorizontal: 8,
          paddingTop: 15,
          borderWidth,
          borderColor
        }}
        keyboardType={keyboardType}
        onFocus={animateText}
        secureTextEntry={secureTextEntry}
        onEndEditing={(e) => verifyTextValue(e.nativeEvent.text)}
        autoCapitalize="none"
      />
      <Animated.Text
        style={{
          position: 'absolute',
          fontSize: animation.interpolate({
            inputRange: [0,100],
            outputRange: [size, 11],
          }),
          color:placeholderColor,
          marginLeft: 8,
          lineHeight: size,
          marginTop: animation.interpolate({
            inputRange: [0,100],
            outputRange: [(height / 2) - (size / 2), 3],
          }),
          opacity: animation.interpolate({
            inputRange: [0,100],
            outputRange: [1, 0.6],
          }),
        }}>
        {props.placeholder}
      </Animated.Text>
    </View>
  );
};
const InputAnimated = (props) => {
  const { AnimatedPlaceholder = true} = props;
  if (AnimatedPlaceholder) {
    return AnimatedInput(props);
  } else {
    return <></>;
  }
};

export default InputAnimated;

/*
    animatedPlaceholder: Habilita ou desabilita o texto animado
    placeholderColor: Cor do texto do placeholder
    placeholder: Texto a ser exibido
    backgroundColor: Cor de fundo
    color: Cor do texto
    height: Altura do box em PX
    width: Largura do box
*/
