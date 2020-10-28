import React, {useContext, useState} from 'react'
import {Animated, Dimensions} from 'react-native'
import Header from '../../../../components/Header'
import ProductContext from '../../../../contexs/ProductContext'
import Dropdown from '../../../../components/Dropdown'
import {App, Title3Regular, Grid} from '../../../style'
import { Container, Form, HeaderContainer, ImageSelect, Nav, PageScroll, ImgBackground, LoadingProgress, ButtonImageContainer } from './style'
import InputAnimated from '../../../../components/InputAnimated'
import Primary from '../../../../components/Buttons/Primary'
import ProgressImage from './assets/load.png' 

export default ({navigation}) => {
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
              outputRange: [150, 50, Dimensions.get("window").width - 40],
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
              <Title3Regular style={{marginBottom: 10}}>Detalhes do produto</Title3Regular>
              <LoadingProgress source={ProgressImage} />
            </Grid>
            
          </Nav>
        </HeaderContainer>
          <App>
            <PageScroll onScroll={e=>toggleAnimation(e.nativeEvent.velocity.y)} scrollEventThrottle={16}>
              <Form>
                <InputAnimated
                    placeholder='Produto'
                    onChangeText={text => setProduto({...produto, categoria: text})}
                    value={produto.categoria}
                    width="100%"
                />
                <InputAnimated
                    placeholder='Descrição do produto'
                    onChangeText={text => setProduto({...produto, descricao_produto: text})}
                    value={produto.descricao_produto}
                    width="100%"
                />
                <InputAnimated
                    placeholder='Descrição do produto'
                    onChangeText={text => setProduto({...produto, descricao_produto: text})}
                    value={produto.descricao_produto}
                    width="100%"
                />
                <InputAnimated
                    placeholder='Descrição do produto'
                    onChangeText={text => setProduto({...produto, descricao_produto: text})}
                    value={produto.descricao_produto}
                    width="100%"
                />
                <InputAnimated
                    placeholder='Descrição do produto'
                    onChangeText={text => setProduto({...produto, descricao_produto: text})}
                    value={produto.descricao_produto}
                    width="100%"
                />
                <Dropdown
                  placeholder="Gluten"
                  listOptions={['Sim', 'Não']} />
                <InputAnimated
                    placeholder='Descrição do produto'
                    onChangeText={text => setProduto({...produto, descricao_produto: text})}
                    value={produto.descricao_produto}
                    width="100%"
                />
                <InputAnimated
                    placeholder='Descrição do produto'
                    onChangeText={text => setProduto({...produto, descricao_produto: text})}
                    value={produto.descricao_produto}
                    width="100%"
                />
                <InputAnimated
                    placeholder='Descrição do produto'
                    onChangeText={text => setProduto({...produto, descricao_produto: text})}
                    value={produto.descricao_produto}
                    width="100%"
                />
                <InputAnimated
                    placeholder='Descrição do produto'
                    onChangeText={text => setProduto({...produto, descricao_produto: text})}
                    value={produto.descricao_produto}
                    width="100%"
                />
                <InputAnimated
                    placeholder='Descrição do produto'
                    onChangeText={text => setProduto({...produto, descricao_produto: text})}
                    value={produto.descricao_produto}
                    width="100%"
                />
              </Form>
              <Primary width="100%" title='Enviar' shadow={2} onPress={()=>closeImage()} />
            </PageScroll>
            {/* 
              categoria: "",
              descricao_produto: "",
              gluten: "",
              unid_medida_produto: "",
              peso_liquido: "",
              peso_bruto: "",
              cod_barras: "",
              dias_validade: "",
              foto_produto: "",
            */}
          </App>
      </Container>
    </>
  )
}