import { Dimensions } from 'react-native'
import RegisterPhone from "./assets/register_phone.png"

const { width } = Dimensions.get('screen')

export const Container = Styled.View`
widht: ${width / 2};
height: ${width / 2};
border-radius: 4px 30px;
overflow: hidden;
`
export const Img = Styled.Image.attrs({
    source: RegisterPhone,
    resizeMode: "contain",
})`
    width: 100%;
    height: 100%;
  `