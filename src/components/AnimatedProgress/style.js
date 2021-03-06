import Styled from 'styled-components/native'

export const Nav = Styled.View`
  width: 100%;
  height: 80px;
  justify-content: space-between;
`
export const LoadingProgressContainer = Styled.View`
  height: 25px;
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
export const CircleStatus = Styled.View`
  width: 25px;
  height: 25px;
  border-radius: 25px;
  background: #E0E0E0;
`
export const BarStatusProgress = Styled.View`
  height: 4px;
  width: 100%;
  background: #E0E0E0;
  margin-top: -14px;
  z-index: 2
`