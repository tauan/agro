import React, {useContext} from 'react'
import {Animated, Text} from 'react-native'
import Header from '../../../components/Header'
import ProductContext from '../../../contexs/ProductContext'
import { Container, Title, HeaderContainer, ImageSelect, Nav, Page, PageScroll } from './style'
import { PanGestureHandler} from 'react-native-gesture-handler'

export default ({navigation}) => {
  const {activePage} = useContext(ProductContext)
  const translateY = new Animated.Value(0)
  const animatedEvent = Animated.event([
    {
      nativeEvent: {
        translationY: translateY
      }
    }
  ], {
    useNativeDriver: false
  })
  const onHandlerStateChanged = event => {

  }
  return(
    <>
      <Header title="Produtos" color="#07AC82" navigation={navigation} />
      <Container>
        <HeaderContainer style={{
          height: translateY.interpolate({
            inputRange: [-200, 0],
            outputRange: [70, 200],
            extrapolate: "clamp"
          })
          
        }}>
          <ImageSelect style={{ height: translateY.interpolate({
            inputRange: [-200, 0],
            outputRange: [42, 200],
            extrapolate: "clamp"
          })}} />
          <Nav />
        </HeaderContainer>
        <PanGestureHandler onHandlerStateChange={onHandlerStateChanged} onGestureEvent={animatedEvent}>
          <Page>
            <PageScroll>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
              <Text>ola</Text>
            </PageScroll>
          </Page>
        </PanGestureHandler>
        
      </Container>
    </>
  )
}