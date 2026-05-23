import React, { Component } from 'react'
import App from 'base-shell/lib'
import _config from './config'
import liff from '@line/liff';
import { initializeApp } from "firebase/app"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBO9v3FeZZrzm4sFPHqX_iWPu-5lKS7Tq8",
  authDomain: "vtd-services.firebaseapp.com",
  projectId: "vtd-services",
  storageBucket: "vtd-services.appspot.com",
  messagingSenderId: "506411756024",
  appId: "1:506411756024:web:1df76de11561490d728e0d"
};

const app = initializeApp(firebaseConfig)

export default class Demo extends Component {

  componentDidMount() {

    liff.init({
      liffId: window.location.href.includes('ngrok') ?  '1656997319-GWD3qoxo' : '1656997319-MQmNAqkq', //'1656997319-MQmNAqkq', //
      withLoginOnExternalBrowser: true, // Enable automatic login process
    })
    // .then(_ => {
    //   liff.sendMessages([{
    //     type: 'template',
    //     altText: 'this is a confirm template',
    //     template: {
    //       type: 'confirm',
    //       actions: [
    //         {
    //           type: 'message',
    //           label: 'Yes',
    //           text: 'Yes'
    //         },
    //         {
    //           type: 'message',
    //           label: 'No',
    //           text: 'No'
    //         }
    //       ],
    //       text: 'Continue?'
    //     }
    //   }]).catch(err => liff.sendMessages([{
    //     type: 'text',
    //     text: JSON.stringify(err)
    //   }
    //   ]))
    // })
  }

  render() {
    return <App config={_config} />
  }
}
