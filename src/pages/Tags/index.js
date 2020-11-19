import React, { useContext, useEffect, useState } from 'react'
import { showMessage } from "react-native-flash-message"
import RNFetchBlob from 'rn-fetch-blob'
import FS from 'react-native-fs'
import axios from 'axios'
import Pdf from 'react-native-pdf';
import { Dimensions, FlatList } from 'react-native'
import Primary from '../../components/Buttons/Primary'
import DownloadFile from './utils/DownloadFile'
import Link from '../../components/Buttons/Link'
import Header from '../../components/Header'
import Items from '../../components/Items'
import Search from '../../components/Search'
import UserContext from '../../contexs/User'
import Tags from '../../contexs/Tags'
import { App, Form, TitleStyle, TextStyle } from '../style'
import {
    Container,
    HeaderTitle,
} from './style'
import ModalMessage from '../../components/ModalMessage'

export default ({ navigation }) => {
    const [tagsList, setTagsList] = useState([])
    const [value, setValue] = useState('')
    const [activeModal, setActiveModal] = useState(false)
    const [active, setActive] = useState(false)
    const { user } = useContext(UserContext)
    const { etiquetas, setEtiquetas } = useContext(Tags)

    useEffect(() => { getTagsList() }, [etiquetas])

    const getTagsList = async (id) => {
        axios.get(`http://dev.renovetecnologia.org:8049/webrunstudio/WS_ETIQUETAS.rule?sys=SIS&JSON=%7B%20%22id_agricultor%22%3A%20${user.id_agricultor}%20%7D`, { headers: { authorization: user.token } })
            .then(({ data }) => setTagsList(data))
    }

    const DeleteTag = async () => {
        const options = {
            method: 'DELETE',
            url: 'http://dev.renovetecnologia.org:8049/webrunstudio/WS_ETIQUETAS.rule',
            params: { sys: 'SIS' },
            headers: {
                cookie: 'JSESSIONID=33BF2936814F3F4270DB0A969E12D473',
                Authorization: user.token,
                'Content-Type': 'application/json'
            },
            data: { chave_identificador: `${etiquetas.chave_identificador}` }
        };

        axios.request(options).then(function (response) {
            response.data.sucesso && showMessage({
                message: 'Etiqueta deletada com sucesso!',
                type: "success",
                style: { justifyContent: 'space-between', alignItems: 'center' },
                titleStyle: { fontSize: 16 },
                icon: { icon: "danger", position: 'right' },
                position: 'top',
                duration: 3000,
            })
            getTagsList()
        }).catch(function (error) {
            console.error(error);
        });
    }

    const CheckFileExist = (item) => {
        const path = `${FS.DownloadDirectoryPath}/${item.chave_identificador}.pdf`
        FS.existsAssets(path).then(( resp ) => {
            console.log(resp)
            if (resp) {
                console.log('Entrou')
                setActive(true)
            } else {
                const options = {
                    method: 'GET',
                    headers: {
                        'authorization': user.token,
                        'Content-Type': 'application/json; charset=utf-8;'
                    },
                    url: 'http://dev.renovetecnologia.org:8049/webrunstudio/IMPRESSAO%20ETIQUETA%20APP.rule?sys=SIS',
                    params: { IDENTIFICADOR: etiquetas.chave_identificador, MODELO_ETIQUETA: etiquetas.modelo_etiqueta }
                };
                axios(options)
                    .then(resp => {
                        DownloadFile({ url: resp.data, uuid: etiquetas.chave_identificador })
                    })
            }
        })
    }

    return (
        <>
            <Header color="#008b54" navigation={navigation} />
            <App>
                <Form style={{ flex: 1 }}>
                    <Container>
                        <HeaderTitle>
                            <TitleStyle>Etiquetas</TitleStyle>
                            <TextStyle>Cadastrar, excluir e gerar etiquetas.</TextStyle>
                        </HeaderTitle>
                        <Primary title="Cadastrar etiquetas" width={150} onPress={() => { setEtiquetas({}); navigation.navigate("TagsForm") }} />
                    </Container>
                    <Search value={value} onChangeText={text => setValue(text)} />
                    {tagsList.length > 0 &&
                        <FlatList
                            data={tagsList.filter(produto => produto.descricao.indexOf(value) != -1)}
                            renderItem={({ item, index }) =>
                                <Items item={item}
                                    index={index}
                                    url={'http://dev.renovetecnologia.org:8049/imagens/tags.png'}
                                    onPress={() => {
                                        setEtiquetas(item);
                                        CheckFileExist(item)
                                    }}
                                    deleteFunction={() => {
                                        setEtiquetas(item);
                                        setActiveModal(true)
                                    }} />
                            }
                            keyExtractor={(keyExtractor, index) => String(index)}
                            columnWrapperStyle={{ justifyContent: "space-between" }}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                        />}
                </Form>
                {activeModal &&
                    <ModalMessage
                        showMessage={{
                            title: 'Atenção!',
                            message: `Deseja realmente deletar esta etiqueta ? `,
                            type: 'alert',
                            icon: true
                        }}
                        title="Deletar"
                        onPressPrimaryButton={() => { DeleteTag(); setActiveModal(false) }}
                        onPressCancelButton={(value) => setActiveModal(value)} >
                    </ModalMessage>}
                {active &&
                    <ModalMessage
                        style={{
                            borderWidth: 1,
                            borderColor: '#008b54',
                            width: Dimensions.get('screen').width * 0.9,
                            height: Dimensions.get('screen').height * 0.85,
                        }}
                        onPressCancelButton={(value) => setActive(value)} >
                        <Pdf
                            source={{ uri: `${RNFetchBlob.fs.dirs.DownloadDir}/${etiquetas.chave_identificador}.pdf` }}
                            style={{
                                flex: 1,
                                width: Dimensions.get('window').width * 0.9,
                                height: Dimensions.get('window').height * 0.85,
                                backgroundColor: "#008b54"
                            }}
                            onLoadComplete={(numberOfPages, filePath) => {
                                console.log(`number of pages: ${numberOfPages}`);
                            }}
                            onPageChanged={(page, numberOfPages) => {
                                console.log(`current page: ${page}`);
                            }}
                            onError={(error) => {
                                // DownloadFile({ url: etiquetas.url, uuid: etiquetas.chave_identificador })
                            }}
                            onPressLink={(uri) => {
                                console.log(`Link presse: ${uri}`)
                            }}
                        />
                        <Link title="Fechar" backgroundColor="#008b54" color="#fff" onPress={() => setActive(false)} />
                    </ModalMessage>}
            </App >
        </>
    )
}