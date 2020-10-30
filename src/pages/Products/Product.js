import React, {useContext, useState, useEffect} from 'react'
import {Animated, Dimensions, View, KeyboardAvoidingView} from 'react-native'
import Header from '../../components/Header'
import ProductContext from '../../contexs/ProductContext'
import {App, Grid} from '../style'
import { 
  HeaderContainer, 
  ImageSelect, 
  PageScroll, 
  ImgBackground, 
  ButtonImageContainer, 
  CleanContainer,
  FixedButtonContainer
} from './style'
import Primary from '../../components/Buttons/Primary'
import PrimaryTouchable from '../../components/Buttons/PrimaryTouchable'

import Produto from './Screens/Produto'
import Producao from './Screens/Producao'
import Propriedades from './Screens/Propriedades'
import Ingredientes from './Screens/Ingredientes'
import Descricao from './Screens/Descricao'
import AnimatedProgress from '../../components/AnimatedProgress'

export default ({navigation}) => {
  useEffect(() => {
    pages[0] !== undefined ? setActivePage(pages[0]) : ""
  },[pages]);
  const { activePage, produto, setActivePage, setProduto } = useContext(ProductContext)
  const [pages, setPages] = useState([{
    route: "Produto",
    textHeader: "Detalhes do produto",
    component: Produto
  }, {
    route: "Producao",
    textHeader: "Detalhes da produção",
    component: Producao
  }, 
  {
    route: "Propriedade",
    textHeader: "Detalhes da propriedade",
    component: Propriedades
  }, 
  {
    route: "Ingredientes",
    textHeader: "Ingredientes",
    component: Ingredientes
  }, 
  {
    route: "Descricao",
    textHeader: "Descrição",
    component: Descricao
  }])
  const nextPage = () => {
    if(activePage !== undefined && activePage.index !== pages.length - 1)
      setActivePage(pages[activePage.index + 1])
  }
  let imageHidde = false
  const progress = new Animated.Value(0)
  const closeImage =  () => {
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
    if(velocity > 1.5 || velocity < -1.5){
      if(velocity > 1.5 && imageHidde === false) {
        closeImage()
        imageHidde = true
      }
      if(velocity < 1.5 && imageHidde === true) {
        console.log("abrir imagem")
        openImage()
        imageHidde = false
      }
    }
  }
  return(
    <>
      <Header title="Produtos" color="#07AC82" navigation={navigation} />
      <App>
        <HeaderContainer>
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
            source={{uri: "https://conteudo.imguol.com.br/c/entretenimento/3e/2017/09/01/tomate-1504283166629_v2_1920x1276.jpg"}} 
            style={{
              opacity: progress.interpolate({
                inputRange: [0, 50, 100],
                outputRange: [1, 1, .15],
                extrapolate: "clamp"
              }),
            }}
            />
            <ButtonImageContainer style={{transform: [{
              translateY: progress.interpolate({
                inputRange: [0, 50, 100],
                outputRange: [0, 0, -50],
                extrapolate: "clamp"
              })
            }]}}>
              <Primary width="100%" title='Alterar imagem' shadow={2} onPress={()=>openImage()} backgroundColor="transparent"  marginTop={0} />
            </ButtonImageContainer>
          </ImageSelect>
          <AnimatedProgress activePage={activePage} setActivePage={setActivePage} pages={pages} />
        </HeaderContainer>
          <CleanContainer>
            <KeyboardAvoidingView style={{flex: 1}}>
            <PageScroll onScroll={e=>toggleAnimation(e.nativeEvent.velocity.y)} scrollEventThrottle={16}>
              { activePage !== undefined && <activePage.component produto={produto} setProduto={setProduto} /> }
            </PageScroll>
            </KeyboardAvoidingView>
          </CleanContainer>
      </App>
      <FixedButtonContainer  
        style={{ transform: [{ translateY: Dimensions.get("window").height - 74 - 10 }] }}>
        <Grid>
          <Primary marginTop={0} width="100%" title='Proxima etapa' shadow={2} onPress={()=> nextPage() } />
        </Grid>
      </FixedButtonContainer>
    </>
  )
}