import React, { useContext, useState, useEffect } from 'react'
import { Animated, Dimensions, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator, View } from 'react-native'
import { showMessage } from "react-native-flash-message"
import ImagePicker from 'react-native-image-picker'
import Header from '../../components/Header'
import ProductContext from '../../contexs/ProductContext'
import { App, Grid, SplashContainer, TitleStyle, TextStyle  } from '../style'
import UserContext from '../../contexs/User'
import {
  HeaderContainer,
  ImageSelect,
  PageScroll,
  ImgBackground,
  ButtonImageContainer,
  CleanContainer,
  FixedButtonContainer,
  Row
} from './style'
import Primary from '../../components/Buttons/PrimaryTouchable'

import Produto from './Screens/Produto'
import Producao from './Screens/Producao'
import Propriedades from './Screens/Propriedades'
import Ingredientes from './Screens/Ingredientes'
import Descricao from './Screens/Descricao'
import AnimatedProgress from '../../components/AnimatedProgress'
import axios from 'axios'

export default ({ navigation }) => {
  const { activePage, produto, producao, propriedades, descricao, ingredientes, setActivePage, setProduto, setProducao, setPropriedades, setDescricao, setIngredientes } = useContext(ProductContext)
  const { user } = useContext(UserContext)
  const [splash, setSplash] = useState(true)
  const [image, setImage] = useState(undefined)
  const [validation, setValidation] = useState(false)
  const [pages, setPages] = useState([{
    route: "Produto",
    textHeader: "Detalhes do produto",
    component: Produto,
    validated: false
  }, {
    route: "Producao",
    textHeader: "Detalhes da produção",
    component: Producao,
    validated: false
  },
  {
    route: "Propriedade",
    textHeader: "Detalhes da propriedade",
    component: Propriedades,
    validated: false
  },
  {
    route: "Ingredientes",
    textHeader: "Ingredientes",
    component: Ingredientes,
    validated: false
  },
  {
    route: "Descricao",
    textHeader: "Descrição",
    component: Descricao,
    validated: false
  }])

  useEffect(() => {
    pages[0] !== undefined ? setActivePage(pages[0]) : ""
    checkProduct()
  }, []);

  let imageHidde = false

  const checkProduct = () => {
    if (produto.id_produto) {
      const tempPages = pages.map(item => {
        item.validated = true
        return item
      })
      setPages(tempPages)
    }
  }

  const nextPage = () => {
    if (activePage !== undefined && activePage.index !== pages.length - 1) { }
    setActivePage(pages[activePage.index + 1])
  }

  const submitForm = async () => {
    try {
      const options = {
        url: "https://dev.renovetecnologia.org/webrunstudio/WS_PRODUTOS.rule?sys=SIS",
        method: "POST",
        data: produto,
        headers: {
          authorization: user.token
        }
      }
      const response = await axios.request(options)
      if (response.data.sucesso !== undefined) {
        showMessage({
          message: response.data.sucesso,
          type: "success",
          style: { justifyContent: 'space-between', alignItems: 'center' },
          titleStyle: { fontSize: 16 },
          icon: { icon: "danger", position: 'right' },
          position: 'top',
          duration: 1500,
        })

        setTimeout(() => navigation.navigate("ProductScreen", { update: true }), 1500)

      }
    } catch (err) {
      console.log(err)
      console.log("Erro ao salvar produto no servidor")
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
        console.log("abrir imagem")
        openImage()
        imageHidde = false
      }
    }
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

  const onPressFloatButton = () => {
    if (activePage.index !== (pages.length - 1)) {
      nextPage()
    } else {
      const validate = pages.filter(item => item.validated === false)
      if (validate.length === 0) {
        submitForm();
      } else {
        setActivePage(validate[0])
      }
    }
  }

  const goBack = () => {
    setActivePage(pages[activePage.index - 1])
  }

  return (
    <>
      {splash === true && (<SplashContainer>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <ActivityIndicator size={40} color="#008b54" />
            <TitleStyle align="center">Aguade...</TitleStyle>
          </View>
          <TextStyle fontsize={18} align="center">Estamos preparando tudo para você!</TextStyle>
        </SplashContainer>)
      }
      <Header color="#07AC82" navigation={navigation} />
      <App>
        <HeaderContainer>
          <TouchableOpacity onPress={pickerImage}>
            <ImageSelect style={{
              width: progress.interpolate({
                inputRange: [0, 50, 100],
                outputRange: [150, 150, Dimensions.get("window").width - 40],
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
                source={{ uri: produto.url_imagem ? produto.url_imagem : 'https://dev.renovetecnologia.org/imagens/image.jpg' }}
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
              {activePage !== undefined && <activePage.component activePage={activePage} setPages={setPages} pages={pages} setValidation={setValidation} user={user} produto={produto} setProduto={setProduto} producao={producao} setProducao={setProducao} propriedades={propriedades} setPropriedades={setPropriedades} descricao={descricao} setDescricao={setDescricao} ingredientes={ingredientes} setIngredientes={setIngredientes} setSplash={setSplash} />}
            </PageScroll>
          </KeyboardAvoidingView>
        </CleanContainer>
      </App>
      <FixedButtonContainer
        style={{ transform: [{ translateY: validation === true ? Dimensions.get("window").height - 74 - 10 : Dimensions.get("window").height + 10 }] }}>
        <Grid>
          <Row>
            {(activePage !== undefined && activePage.index > 0) && <Primary marginTop={0} title="<" width="15%" onPress={() => goBack()} />}

            <Primary marginTop={0} width={(activePage !== undefined && activePage.index > 0) ? "82%" : "100%"} title={activePage === undefined ? " " : (activePage.index !== (pages.length - 1) ? "Proximo" : "Finalizar")} shadow={2} onPress={() => { onPressFloatButton() }} />
          </Row>
        </Grid>
      </FixedButtonContainer>
    </>
  )
}