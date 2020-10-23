export default props => {

  const { valid, value} = props
  if(valid === "none")
    return true
  if(valid === "email") {
    if(value!== undefined && value.includes("@") && value.length > 5) 
      return true
  }
  if(valid === "password") {
    if(value.length >= 6)
      return true
  }
  return false
}