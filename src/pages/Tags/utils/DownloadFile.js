import { PermissionsAndroid } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'

const DownloadFile = async (value) => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const { dirs } = RNFetchBlob.fs
            RNFetchBlob.config({
                fileCache: true,
                path: dirs.DownloadDir + `/${value.uuid}.pdf`,
                addAndroidDownloads: {
                    notification: true,
                    title: `${value.uuid}.pdf`,
                    mime: 'application/pdf',
                    description: 'Etiquetas.',
                    path: dirs.DownloadDir + `/${value.uuid}.pdf`,
                }
            }).fetch('GET', value.url).then(
                resp => {
                    if (resp.status === 500) return false 
                }
            )
        } else {
            console.log('Permissão negada!');
        }
    } catch (err) {
        console.log(err)
    }
    return  false
}

export default DownloadFile