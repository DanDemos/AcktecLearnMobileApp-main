import React,{ useState,useEffect } from "react";
import {
  Text,
  View,
} from 'react-native';
import StaticServer from "react-native-static-server";
import WebView from "react-native-webview";
import RNFS from "react-native-fs";
import { unzip } from 'react-native-zip-archive'

const App = () => {
  const [url,setUrl] = useState('')
  const [renderedOnce,setRenderedOnce] = useState(false);

  function downloadCourseMaterial() {
    RNFS.downloadFile({
      fromUrl: 'https://dev2.acktec.co/testB1.zip',
      toFile: RNFS.DocumentDirectoryPath + '/testB1.zip'
    }).promise.then((result) => {
      console.log("download end");
      const sourcePath = `${RNFS.DocumentDirectoryPath}/testB1.zip`
      const targetPath = `${RNFS.DocumentDirectoryPath}`
      unzip(sourcePath,targetPath)
        .then((path) => {
          console.log(`unzip completed at ${path}`)
        })
        .catch((error) => {
          console.error(error)
        })
    }).catch((err) => {
      console.log(err)
    });
  };

  useEffect(() => {
    downloadCourseMaterial()
    const server = new StaticServer(8080,RNFS.DocumentDirectoryPath);
    server.start().then(url => {
      setUrl(url);
    }).catch(error => {
      console.log(error)
    })

    return function cleanup() {
      if (server && server.isRunning()) {
        server.stop();
      }
    };
  },[])

  const updateSource = () => {
    setRenderedOnce(true);
  }

  const localURI = `${RNFS.DocumentDirectoryPath}/LVL_10_B1/index.html`;
  const uri = `${url}/LVL_10_B1/index.html`

  return (
    <View>
      <Text>{uri}</Text>
      <View style={{ height: "100%",width: "100%" }}>
        <WebView
          style={{ flex: 1,marginBottom: 20 }}
          source={{ uri: localURI }}
          originWhitelist={['file://']}
          allowFileAccess={true}
          allowingReadAccessToURL={true}
          allowsInlineMediaPlayback={true}
          allowFileAccessFromFileURLs={true}
          allowUniversalAccessFromFileURLs={true}
          onLoad={updateSource}
        />
      </View>
    </View>
  );
}
export default App;