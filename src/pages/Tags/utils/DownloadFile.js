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
                    description: 'Your test reports.',
                    path: dirs.DownloadDir + `/${value.uuid}.pdf`,
                }
            }).fetch('GET', value.url)
                .then((resp) => {
                    console.log(resp.data)
                })
        } else {
            console.log('Permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
}

export default DownloadFile