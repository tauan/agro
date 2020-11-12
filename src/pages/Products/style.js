
import Styled from 'styled-components/native'
import { Dimensions,Animated } from 'react-native'

const { width } = Dimensions.get('screen')

export const Container = Styled.View`
  width:${width}px;
  flex-direction: row;
  margin-bottom: 30px;
`
export const CleanContainer = Styled.View`
  flex: 1;
  width: 100%;
`
export const HeaderTitle = Styled.View`
  width:${width / 2}px;  
`
export const DetailsContainer = Styled.View`
  width: 100%;
  justify-content: center;  
`
export const HeaderCard = Styled.View`
  width: 100%;
  justify-content: center;
  margin-top: 0px;
  margin-Vertical: 25px;
  padding-horizontal: 15px;
`
export const BodyCard = Styled.View`
  width: 100%;
`
export const Section = Styled.View`
  justify-content: space-between;
  flex-direction: ${props => props.direction ? props.direction : 'row'};
  background-color: ${props => props.background ? props.background : 'transparent'};
`
export const Item = Styled.View`
  margin-bottom: 15px;
`
export const FilterContainer = Styled.View`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  align-items: flex-end;
`
export const Button = Styled.Pressable.attrs({
  android_ripple: { color: '#63636350' }
})
  `
  border-radius: 0px;
  width: ${props => props.size ? props.size : '50%'};
  justify-content: center;
  align-items: center;
  background-color: ${props => props.background ? props.background : '#008b54'};
  padding: 15px;
  flex-direction: row;
  z-index: 10000;
`
export const CloseButton = Styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 10px;
  right: 0px;
`
export const TextButton = Styled.Text`
  color: ${props => props.color ? props.color : '#333'};
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
  width: 100%;
  flex: 1;
`
export const Form = Styled.View`
  flex: 1;
  padding-bottom: 75px
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
export const App = Styled.View`
`
export const FixedButtonContainer = Styled(Animated.View)`
  position: absolute;
  z-index: 6;
  width: 100%;
  height: 50px;
`
export const Row = Styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap
  
`
export const ContainerList = Styled.View`
  margin-top: 16px
`
export const ItemContainer = Styled.View`
  width: 99%;
  margin-horizontal: .5%;
  height: 40px;
  elevation: 3;
  background: #fff;
  margin-bottom: 16px;
  flex-direction: row;
  border-radius: 4px;
`

export const ItemText = Styled.Text`
  background: #fff;
  height: 100%;
  line-height: 35px;
  padding-left: 8px;
  flex: 1;
  color: #333
`
export const DeleteButton = Styled.TouchableOpacity`
  background: #fff;
  align-items: center;
  justify-content: center
`

