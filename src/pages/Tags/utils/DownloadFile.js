import RNFetchBlob from 'rn-fetch-blob'

const DownloadFile = (value) => {
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
}

export default DownloadFile