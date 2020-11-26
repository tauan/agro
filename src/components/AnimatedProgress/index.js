import React, { useEffect, useRef } from 'react'
import { Nav, LoadingProgressContainer, CircleStatus, BarStatusProgress } from './style'
import { Grid, Title3, Title3Regular, CleanContainer } from '../../pages/style'
import {  TouchableWithoutFeedback ,Animated, Dimensions } from 'react-native'

export default props => {
  const { activePage, pages, setActivePage } = props
  const { width } = Dimensions.get("window")
  // up
  useEffect(() => {
    const atualRoute = pages.find((page, index) => {
      page.index = index
      return page === activePage
    })
    setActivePage(atualRoute)
    pages.map((page, key) => {
      page === activePage ? animation((100 / (pages.length == 1 ? pages.length : pages.length - 1)) * key) : ""
    })
  }, [activePage])

  const onPress = (item) => {
    if(activePage.index > item.index) setActivePage(item)
    if(item.validated) setActivePage(item)
    if(pages[item.index - 1] && pages[item.index - 1].validated) setActivePage(item)
  }

  const animationProgress = useRef(new Animated.Value(0)).current

  const animation = toValue => {
    Animated.timing(animationProgress, {
      toValue,
      duration: 500,
      useNativeDriver: false
    }).start()
  }
  return (
    <Nav>
      <CleanContainer>
        <Title3 style={{ marginVertical: pages.length > 1 ? 20 : 40 }}>{activePage !== undefined ? activePage.textHeader : " "}</Title3>
        {pages.length > 1 && <>
          <LoadingProgressContainer>
            {
              pages.map((item, key) => {
                if(item === activePage) {
                  return (
                    <TouchableWithoutFeedback key={key} onPress={() => onPress(item)}>
                      <CircleStatus style={{ backgroundColor: "#008B54" }} />
                    </TouchableWithoutFeedback>
                  )
                }else {
                  return (
                    <TouchableWithoutFeedback key={key} onPress={() => onPress(item)}>
                      <CircleStatus style={{ backgroundColor: activePage !== undefined ? (pages[key].validated !== false ? "#13BB78" : "#E0E0E0") : "#E0E0E0" }} />
                    </TouchableWithoutFeedback>
                  )
                }
                
              })
            }
          </LoadingProgressContainer>
          <BarStatusProgress>
            <Animated.View style={{
              borderRadius: 5,
              height: "100%",
              backgroundColor: "#13BB78",
              width: animationProgress.interpolate({
                inputRange: [0, 100],
                outputRange: [0, width - 40],
                extrapolate: "clamp"
              })
            }} />
          </BarStatusProgress>
        </>
        }
      </CleanContainer>
    </Nav>
  )
}