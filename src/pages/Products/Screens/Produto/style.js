import Styled from 'styled-components/native'
import {Animated} from 'react-native'

export const Container = Styled.View`
  background: #000;
  flex: 1
`
export const Title = Styled.Text`
  color: #fff
`
export const HeaderContainer = Styled(Animated.View)`
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #fff;
  overflow: hidden;
  padding-bottom: 15px;
`
export const ImageSelect = Styled(Animated.View)`
  background: #07AC82;
  margin: 16px;
  margin-top: 0;
  overflow: hidden
`
export const ImgBackground = Styled(Animated.Image)`
  width: 100%;
  height: 100%
`
export const Nav = Styled.View`
  width: 100%;
  height: 60px;
  justify-content: space-between;
`
export const Page = Styled(Animated.View)`
  width: 100%;
  height: 2000px;
  background: #ccc;
  margin-top: 20px;
`
export const PageScroll = Styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  padding-bottom: 5px;
  width: 100%
`
export const Form = Styled.View`
`
export const Subtitle = Styled.Text``
export const LoadingProgressContainer = Styled.View`
  height: 20px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;
  z-index: 5;
`
export const LoadingProgress = Styled.Image`
  height: 14px;
  width: 100%;
`
export const ButtonImageContainer = Styled(Animated.View)``
export const CircleStatus = Styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: #E0E0E0;
`
export const BarStatusProgress = Styled.View`
  height: 4px;
  width: 100%;
  background: #E0E0E0;
  margin-top: -12px;
  z-index: 2
`