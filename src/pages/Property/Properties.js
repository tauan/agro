import React, { useContext, useState, useEffect } from 'react'
import { Animated, Dimensions, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { showMessage } from "react-native-flash-message"
import axios from 'axios'
import ImagePicker from 'react-native-image-picker'
import Header from '../../components/Header'
import PropertiesContext from '../../contexs/Properties'
import { App, Grid } from '../style'
import UserContext from '../../contexs/User'
import {
  HeaderContainer,
  ImageSelect,
  PageScroll,
  ImgBackground,
  ButtonImageContainer,
  CleanContainer,
  FixedButtonContainer
} from './style'
import Primary from '../../components/Buttons/PrimaryTouchable'
import Propriedade from './Screens/Propriedade'
import AnimatedProgress from '../../components/AnimatedProgress'

const { width } = Dimensions.get("window");

export default ({ navigation }) => {
  const { activePage, propriedade, setActivePage, setPropriedade } = useContext(PropertiesContext)
  const { user } = useContext(UserContext)
  const [image, setImage] = useState(undefined)
  const [validation, setValidation] = useState(false)
  const [pages, setPages] = useState([
    {
      route: "Propriedade",
      textHeader: "Dados da propriedade",
      component: Propriedade,
      validated: false
    },
  ])

  useEffect(() => {
    pages[0] !== undefined ? setActivePage(pages[0]) : ""
  }, [pages]);

  let imageHidde = false

  const nextPage = () => {
    if (activePage !== undefined && activePage.index !== pages.length - 1) { }
    setActivePage(pages[activePage.index + 1])
  }

  const submitForm = async () => {
    const options = {
      method: 'POST',
      headers: { 'authorization': user.token },
      data: Object.assign(propriedade, { id_agricultor: user.id_agricultor }),
      url: 'https://dev.renovetecnologia.org/webrunstudio/WS_PROPRIEDADE.rule?sys=SIS',
    };
    await axios(options)
      .then(resp => {
        showMessage({
          message: `${resp.data.sucesso}`,
          type: "success",
          style: { justifyContent: 'space-between', alignItems: 'center' },
          titleStyle: { fontSize: 16 },
          icon: { icon: "danger", position: 'right' },
          position: 'top',
          duration: 3000,
        })
        navigation.navigate("PropertyScreen", { update: true })
      })
  }

  const progress = new Animated.Value(0)

  const closeImage = () => {
    Animated.timing(progress, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: false
    }).start()
  }

  const openImage = () => {
    Animated.timing(progress, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false
    }).start()
  }

  const toggleAnimation = velocity => {
    if (velocity > 1.5 || velocity < -1.5) {
      if (velocity > 1.5 && imageHidde === false) {
        closeImage()
        imageHidde = true
      }
      if (velocity < 1.5 && imageHidde === true) {
        console.log("abrir imagem")
        openImage()
        imageHidde = false
      }
    }
  }

  const pickerImage = async () => {
    // ImagePicker.launchImageLibrary({
    ImagePicker.launchCamera({
      includeBase64: true
    }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setImage(response)
        setPropriedade({ ...propriedade, foto: response.data })
      };
    })
  }
  return (
    <>
      <Header color="#07AC82" navigation={navigation} />
      <App>
        <HeaderContainer>
          <TouchableOpacity onPress={pickerImage}>
            <ImageSelect style={{
              width: progress.interpolate({
                inputRange: [0, 50, 100],
                outputRange: [150, 150, width - 40],
                extrapolate: "clamp"
              }),
              height: progress.interpolate({
                inputRange: [0, 50, 100],
                outputRange: [150, 50, 50],
                extrapolate: "clamp"
              }),
              borderRadius: progress.interpolate({
                inputRange: [0, 50, 100],
                outputRange: [150, 150, 4],
                extrapolate: "clamp"
              }),
            }}>
              <ImgBackground
                resizeMode="cover"
                source={{ uri: image ? `data:image/jpg;base64,${image.data}` : propriedade.url_imagem ? propriedade.url_imagem : 'https://dev.renovetecnologia.org/imagens/image.jpg' }}
                style={{
                  opacity: progress.interpolate({
                    inputRange: [0, 50, 100],
                    outputRange: [1, 1, .15],
                    extrapolate: "clamp"
                  }),
                }}
              />
              <ButtonImageContainer style={{
                transform: [{
                  translateY: progress.interpolate({
                    inputRange: [0, 50, 100],
                    outputRange: [0, 0, -50],
                    extrapolate: "clamp"
                  })
                }]
              }}>
                <Primary width="100%" title='Alterar imagem' shadow={2} onPress={pickerImage} backgroundColor="transparent" marginTop={0} />
              </ButtonImageContainer>
            </ImageSelect>
          </TouchableOpacity>
          <AnimatedProgress activePage={activePage} setActivePage={setActivePage} setPages={setPages} pages={pages} />
        </HeaderContainer>
        <CleanContainer>
          <KeyboardAvoidingView style={{ flex: 1 }}>
            <PageScroll contentContainerStyle={{ paddingBottom: 60 }} onScroll={e => toggleAnimation(e.nativeEvent.velocity.y)} scrollEventThrottle={16}>
              {activePage !== undefined && <activePage.component activePage={activePage} setPages={setPages} pages={pages} setValidation={setValidation} propriedade={propriedade} setPropriedade={setPropriedade} />}
            </PageScroll>
          </KeyboardAvoidingView>
        </CleanContainer>
      </App>
      <FixedButtonContainer
        style={{ transform: [{ translateY: validation === true ? Dimensions.get("window").height - 74 - 10 : Dimensions.get("window").height + 10 }] }}>
        <Grid>
          <Primary marginTop={0} width="100%" title={activePage === undefined ? " " : (activePage.index !== (pages.length - 1) ? "Proximo" : propriedade.id_propriedade != undefined ? "Atualizar" : "Cadastrar")} shadow={2} onPress={() => {
            activePage.index !== (pages.length - 1) ? nextPage() : submitForm();
          }} />
        </Grid>
      </FixedButtonContainer>
    </>
  )
}