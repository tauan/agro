import React, { useEffect, useRef } from 'react'
import { Nav, LoadingProgressContainer, CircleStatus, BarStatusProgress } from './style'
import { Grid, Title3, Title3Regular, CleanContainer } from '../../pages/style'
import { TouchableOpacity, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native'

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
    setActivePage(item)
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
                return (
                  <TouchableOpacity key={key} onPress={() => onPress(item)}>
                    <CircleStatus style={{ backgroundColor: activePage !== undefined ? (pages[key].validated !== false ? "#008b54" : "#E0E0E0") : "#E0E0E0" }} />
                  </TouchableOpacity>
                )
              })
            }
          </LoadingProgressContainer>
          <BarStatusProgress>
            <Animated.View style={{
              borderRadius: 5,
              height: "100%",
              backgroundColor: "#008b54",
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