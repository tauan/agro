import React, { useContext, useState, useEffect } from 'react'
import { Animated, Dimensions, KeyboardAvoidingView, Text, Image } from 'react-native'
import { ProgressBar } from '@react-native-community/progress-bar-android'
import { showMessage } from "react-native-flash-message"
import DownloadFile from './utils/DownloadFile'
import Header from '../../components/Header'
import TagsContext from '../../contexs/Tags'
import { App, Grid, SplashContainer } from '../style'
import UserContext from '../../contexs/User'
import ModalMessage from '../../components/ModalMessage'
import axios from 'axios'
import {
  HeaderContainer,
  PageScroll,
  CleanContainer,
  FixedButtonContainer,
  HeaderTitle,
} from './style'
import Primary from '../../components/Buttons/PrimaryTouchable'
import Etiquetas from './Screens/Etiquetas'
import AnimatedProgress from '../../components/AnimatedProgress'

export default ({ navigation }) => {
  const { activePage, etiquetas, setActivePage, setEtiquetas } = useContext(TagsContext)
  const { user } = useContext(UserContext)
  const [validation, setValidation] = useState(false)
  const [active, setActive] = useState(false)
  const [splash, setSplash] = useState(false)
  const [pages, setPages] = useState([
    {
      route: "Etiquetas",
      textHeader: "Dados da etiqueta",
      component: Etiquetas,
      validated: true
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
      headers: { 'authorization': user.token, 'Content-Type': 'application/json; charset=utf-8;' },
      data: Object.assign(etiquetas, { id_agricultor: user.id_agricultor }),
      url: 'https://dev.renovetecnologia.org/webrunstudio/WS_ETIQUETAS.rule?sys=SIS',
    };
    try {
      await axios.request(options)
        .then(resp => {
          DownloadFile(resp.data).then(resp => {
            resp.data && showMessage({
              message: 'As etiquetas foram geradas com sucesso!',
              type: "success",
              style: { justifyContent: 'space-between', alignItems: 'center' },
              titleStyle: { fontSize: 16 },
              icon: { icon: "danger", position: 'right' },
              position: 'top',
              duration: 3000,
            })
            setSplash(false)
          })
          navigation.navigate("TagsScreen", { update: true })
        })
    } catch (err) {
      setTimeout(function () {
        showMessage({
          message: 'Não foi possível baixar o arquivo!',
          type: "warning",
          style: { justifyContent: 'space-between', alignItems: 'center' },
          titleStyle: { fontSize: 16 },
          icon: { icon: "warning", position: 'right' },
          position: 'top',
          duration: 3000,
        })
        setSplash(false)
      }, 3000)
    }
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
        openImage()
        imageHidde = false
      }
    }
  }

  return (
    <>
      {splash === true && (
        <SplashContainer>
          <Image source={{ uri: 'https://dev.renovetecnologia.org/imagens/tags.png' }} style={{ width: 200, height: 200, borderRadius: 100 }} />
          <Text style={{ fontSize: 20, lineHeight: 48 }}>Estamos preparando tudo!</Text>
          <ProgressBar
            styleAttr="Horizontal" color="'#07AC82" style={{ width: '60%' }} />
          <Text style={{ fontSize: 20, color: '#07AC82' }}>Aguarde...</Text>
        </SplashContainer>
      )
      }
      <Header color="#07AC82" navigation={navigation} />
      <App>
        <HeaderContainer>
          <AnimatedProgress activePage={activePage} setActivePage={setActivePage} setPages={setPages} pages={pages} />
        </HeaderContainer>
        <CleanContainer>
          <KeyboardAvoidingView style={{ flex: 1 }}>
            <PageScroll onScroll={e => toggleAnimation(e.nativeEvent.velocity.y)} scrollEventThrottle={16}>
              {activePage !== undefined && <activePage.component activePage={activePage} setPages={setPages} pages={pages} setValidation={setValidation} user={user} etiquetas={etiquetas} setEtiquetas={setEtiquetas} />}
            </PageScroll>
          </KeyboardAvoidingView>
        </CleanContainer>
      </App>
      <FixedButtonContainer
        style={{ transform: [{ translateY: validation === true ? Dimensions.get("window").height - 74 - 10 : Dimensions.get("window").height + 10 }] }}>
        <Grid>
          <Primary marginTop={0} width="100%" title="Gerar Etiqueta" shadow={2} onPress={() => {
            setSplash(true); submitForm();
          }} />
        </Grid>
      </FixedButtonContainer>
    </>
  )
}