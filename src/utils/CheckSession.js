import axios from 'axios'

export default (token, logout) => {
  axios.get("http://dev.renovetecnologia.org:8049/webrunstudio/WS_CATEGORIAS.rule?sys=SIS", {
    headers: {
      authorization: token
    }
  }).then(response => {
    const { data } = response
    data.erro !== undefined ? logout() : ""
  }).catch(err => console.log(err))
}