import React, { useContext, useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { View, TouchableOpacity, Text, Dimensions, FlatList  } from 'react-native'
import { showMessage } from "react-native-flash-message"
import RNFetchBlob from 'rn-fetch-blob'
import Share from 'react-native-share';
import FS from 'react-native-fs'
import axios from 'axios'
import Pdf from 'react-native-pdf';
import Primary from '../../components/Buttons/Primary'
import DownloadFile from './utils/DownloadFile'
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
            .then(({ data }) => {
                setTagsList(data)
            })
    }

    const DeleteTag = () => {
        const options = {
            method: 'DELETE',
            url: 'http://dev.renovetecnologia.org:8049/webrunstudio/WS_ETIQUETAS.rule',
            params: { sys: 'SIS' },
            headers: {
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
                icon: { icon: "success", position: 'right' },
                position: 'top',
                duration: 3000,
            })
            getTagsList()
        }).catch(function (error) {
            console.error(error);
        });
    }

    const GetFile = async (item) => {
        try {
            const options = {
                headers: {
                    'authorization': user.token,
                    'Content-Type': 'application/json; charset=utf-8;'
                },
                params: { IDENTIFICADOR: item.chave_identificador, MODELO_ETIQUETA: item.modelo_etiqueta }
            };
            const { data } = await axios.get('http://dev.renovetecnologia.org:8049/webrunstudio/IMPRESSAO_ETIQUETA_APP.rule?sys=SIS', options)
            DownloadFile({ url: data, uuid: item.chave_identificador })
        } catch (err) {
            console.log(err)
        }
    }

    const CheckFileExist = (item) => {
        const path = `${RNFetchBlob.fs.dirs.DownloadDir}/${item.chave_identificador}.pdf`
        FS.exists(path).then(resp => {
            if (resp) {
                setActive(true)
            } else {
                GetFile(item)
            }
        })

    }

    const myCustomShare = async () => {
        const path = `file://${RNFetchBlob.fs.dirs.DownloadDir}/${etiquetas.chave_identificador}.pdf`
        const options = {
            url: path,
            message: `Etiquetas para impressão do produto ${etiquetas.descricao}`
        }

        try {
            const shareResponse = await Share.open(options)
        } catch (e) {
            e && console.log(e)
        }
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
                        <Primary title="Cadastrar etiquetas" width={150} onPress={() => { navigation.navigate("TagsForm") }} />
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
                                        setActiveModal(true);
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
                            message: `Deseja realmente deletar esta etiqueta? `,
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
                            borderColor: '#27B864',
                            width: Dimensions.get('screen').width * 0.9,
                            height: Dimensions.get('screen').height * 0.65,
                        }}
                        onPressCancelButton={(value) => setActive(value)} >
                        <Pdf
                            singlePage={true}
                            source={{ uri: `${RNFetchBlob.fs.dirs.DownloadDir}/${etiquetas.chave_identificador}.pdf` }}
                            style={{
                                flex: 1,
                                width: Dimensions.get('window').width * 0.9,
                                height: Dimensions.get('window').height * 0.85,
                                backgroundColor: "#d5d5d5"
                            }}
                        />
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#27B864', paddingVertical: 5, paddingHorizontal: 10 }}>
                            <TouchableOpacity
                                style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 40 }}
                                onPress={() => setActive(false)}>
                                <MaterialCommunityIcons
                                    name="close"
                                    size={20}
                                    color="#ffffff" />
                                <Text style={{ color: '#fff' }}>Fechar</Text>
                            </TouchableOpacity>
                            <View style={{ position: 'absolute', top: -30, right: 20, backgroundColor: '#FFF', borderRadius: 50, elevation: 5 }}>
                                <TouchableOpacity
                                    style={{ justifyContent: 'center' }}
                                    onPress={() => myCustomShare()}>
                                    <MaterialCommunityIcons
                                        name="share-circle"
                                        size={60}
                                        color="#FEBA02" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ModalMessage>}
            </App >
        </>
    )
}