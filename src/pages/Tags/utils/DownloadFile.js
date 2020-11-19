import React from 'react'
import RNFetchBlob from 'rn-fetch-blob'

const DownloadFile = (value) => {
    const { dirs } = RNFetchBlob.fs
    RNFetchBlob.config({
        fileCache: true,
        path: dirs.DownloadDir + `/${value.uuid}.pdf`,
        addAndroidDownloads: {
            notification: true,
            useDownloadManager: true,
            title: `${value.uuid}.pdf`,
            mime: 'application/pdf',
            description: 'Your test reports.',
            path: dirs.DownloadDir + `/${value.uuid}.pdf`,
        }
    }).fetch('GET', value.url)
        .then((resp) => {
            console.log(resp.data)
        })
    // console.log(result)
}

export default DownloadFile