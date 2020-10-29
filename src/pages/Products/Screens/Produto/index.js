import React, {useContext, useState, useEffect} from 'react'
import {Animated, Dimensions} from 'react-native'
import Header from '../../../../components/Header'
import ProductContext from '../../../../contexs/ProductContext'
import {App, Title3Regular, Grid} from '../../../style'
import { 
  Container, 
  HeaderContainer, 
  ImageSelect, 
  Nav, 
  PageScroll, 
  ImgBackground, 
  LoadingProgressContainer, 
  LoadingProgress, 
  ButtonImageContainer, 
  CircleStatus ,
  BarStatusProgress
} from './style'
import Primary from '../../../../components/Buttons/Primary'
import ProgressImage from './assets/load.png' 

import Produto from './Screens/1'
import Producao from './Screens/2'

export default ({navigation}) => {
  useEffect(() => {
    setActivePage(1)
  },[]);
  const { activePage, produto, setActivePage, setProduto } = useContext(ProductContext)
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
      <Container>
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
          <Nav>
            <Grid>
              <Title3Regular style={{marginVertical: 10}}>Detalhes do produto</Title3Regular>
              <LoadingProgressContainer>
                <CircleStatus style={{backgroundColor: activePage === 1 ? "#10AC84" : "#E0E0E0"}} />
                <CircleStatus style={{backgroundColor: activePage === 2 ? "#10AC84" : "#E0E0E0"}} />
                <CircleStatus style={{backgroundColor: activePage === 3 ? "#10AC84" : "#E0E0E0"}} />
                <CircleStatus style={{backgroundColor: activePage === 4 ? "#10AC84" : "#E0E0E0"}} />
                <CircleStatus style={{backgroundColor: activePage === 5 ? "#10AC84" : "#E0E0E0"}} />
              </LoadingProgressContainer>
              <BarStatusProgress>
              </BarStatusProgress>
              
            </Grid>
            
          </Nav>
        </HeaderContainer>
          <App>
            <PageScroll onScroll={e=>toggleAnimation(e.nativeEvent.velocity.y)} scrollEventThrottle={16}>
              {activePage === 1 && <Produto setActivePage={setActivePage} activePage={activePage} produto={produto} />}
              {activePage === 2 && <Producao setActivePage={setActivePage} activePage={activePage} produto={produto} />}
            </PageScroll>
            
            
          </App>
      </Container>
    </>
  )
}