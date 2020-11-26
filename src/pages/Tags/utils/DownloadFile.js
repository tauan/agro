import { PermissionsAndroid } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'

const DownloadFile = async (value) => {
    let data = (value) => value
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
            }).fetch('GET', value.url)
                .then(resp => console.log(resp))
        } else {
            console.log('Permissão negada!');
        }
    } catch (err) {
        console.warn(err);
    }
    console.log(data())
}

export default DownloadFile