import React, { useContext, useState, useEffect } from 'react'
import { Animated, Dimensions, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { showMessage } from "react-native-flash-message"
import ImagePicker from 'react-native-image-picker'
import axios from 'axios'
import Header from '../../components/Header'
import { App, Grid, TitleStyle, TextStyle, SplashContainer } from '../style'
import UserContext from '../../contexs/User'
import {
  HeaderContainer,
  ImageSelect,
  PageScroll,
  ImgBackground,
  ButtonImageContainer,
  CleanContainer,
  FixedButtonContainer,
  HeaderTitle,
} from './style'
import Primary from '../../components/Buttons/PrimaryTouchable'
import Perfil from './Screens/Perfil'
import AnimatedProgress from '../../components/AnimatedProgress'

const { width } = Dimensions.get("window");

export default ({ navigation }) => {
  const { user, profile, activePage, setProfile, setActivePage } = useContext(UserContext)
  const [infoButton, setInfoButton] = useState({ title: "Proximo", onPress: () => nextPage() })
  const [validation, setValidation] = useState(false)
  const [splash, setSplash] = useState(true)
  const [pages, setPages] = useState([
    {
      route: "",
      textHeader: "Dados do usuário",
      component: Perfil,
      validated: true
    },
  ])
  let imageHidde = false
  
  useEffect(() => {
    pages[0] !== undefined ? setActivePage(pages[0]) : ""
    GetDataUser()
  }, [pages]);

  const GetDataUser = async () => {
    const { data } = await axios.get(`https://dev.renovetecnologia.org/webrunstudio/WS_AGRICULTOR.rule?sys=SIS&JSON=%7B%20%22id_agricultor%22%3A%20${user.id_agricultor}%20%7D`, { headers: { authorization: user.token } })
    setProfile(data)
    setSplash(false)
  }

  const nextPage = () => {
    if (activePage !== undefined && activePage.index !== pages.length - 1) { }
    setActivePage(pages[activePage.index + 1])
  }

  const submitForm = async () => {
    const options = {
      method: 'POST',
      headers: { 'authorization': user.token },
      data: profile,
      url: 'https://dev.renovetecnologia.org/webrunstudio/WS_AGRICULTOR.rule?sys=SIS',
    };
    const { data } = await axios.request(options)
    showMessage({
      message: `${data.sucesso}`,
      type: "success",
      style: { justifyContent: 'space-between', alignItems: 'center' },
      titleStyle: { fontSize: 16 },
      icon: { icon: "success", position: 'right' },
      position: 'top',
      duration: 3000,
    })
  }

  const pickerImage = async () => {
    ImagePicker.launchImageLibrary({
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
      };
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

  return (
    <>
      {splash === true && (
        <SplashContainer>
          <HeaderTitle style={{ width: '100%' }}>
            <TitleStyle align="center">Aguade...</TitleStyle>
            <ActivityIndicator size={50} color="#008b54" />
            <TextStyle fontsize={18} align="center">Estamos preparando tudo para você!</TextStyle>
          </HeaderTitle>
        </SplashContainer>
        
      )
      }
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
                source={{ uri: 'https://images.assetsdelivery.com/compings_v2/jenjawin/jenjawin1904/jenjawin190400208.jpg' }}
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
            <PageScroll onScroll={e => toggleAnimation(e.nativeEvent.velocity.y)} scrollEventThrottle={16}>
              {activePage !== undefined && <activePage.component activePage={activePage} setValidation={setValidation} pages={pages} setPages={setPages} pages={pages} profile={profile} user={user} setProfile={setProfile} />}
            </PageScroll>
          </KeyboardAvoidingView>
        </CleanContainer>
      </App>
      <FixedButtonContainer
        style={{ transform: [{ translateY: validation === true ? Dimensions.get("window").height - 74 - 10 : Dimensions.get("window").height + 10 }] }}>
        <Grid>
          <Primary marginTop={0} width="100%" title={activePage === undefined ? " " : (activePage.index !== (pages.length - 1) ? "Proximo" : "Atualizar dados")} shadow={2} onPress={() => {
            activePage.index !== (pages.length - 1) ? nextPage() : submitForm();
          }} />
        </Grid>
      </FixedButtonContainer>
    </>
  )
}