import { Typography } from '@mui/material'
import Page from 'material-ui-shell/lib/containers/Page'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import liff from '@line/liff';
// const luxon = require('luxon');
// const DateTime = luxon.DateTime;


// const onServer = !window.location.href.includes('.local'); // it's localhost on Firebase
// let urlPrefix = onServer ? 'https://api.vtd-thai.or.th' : 'http://localhost:8080'


const ShareTarget = () => {
  const intl = useIntl()

  const [messages, setmessages] = useState([]);
  // const [context, setcontext] = useState({});
  // const [profile, setprofile] = useState({});



function buildMessages(messages) {
    return new Promise((resolve, reject) => {
        resolve([flexMessages.songkran65])
    })
}

let flexMessages = {
    songkran65: {
        type: 'flex',
        altText: 'สงกรานต์',
        contents: {
            type: 'bubble',
            size: 'giga',
            hero: {
              type: 'image',
              url: 'https://vtd-thai.or.th/wp-content/uploads/2022/04/585636_0.jpg',
              size: 'full',
              aspectRatio: '1:1',
              aspectMode: 'cover'
            },
            body: {
              type: 'box',
              layout: 'vertical',
              spacing: 'md',
              action: {
                type: 'uri',
                label: 'Action',
                uri: 'https://linecorp.com'
              },
              contents: [
                {
                  type: 'text',
                  text: 'ขอเรียนเชิญรดน้ำดำหัวเนื่องในเทศกาลสงกรานต์ ปีใหม่ไทย 2565',
                  weight: 'bold',
                  size: 'xl',
                  wrap: true,
                  contents: []
                },
                {
                  type: 'text',
                  text: 'ด้วยสมาคมนักเรียนเก่าเยอรมันฯ ร่วมกับ มูลนิธิวัฒนธรรมไทย - เยอรมัน จะจัดพิธีรดน้ำดำหัว ฯพณฯ เอกอัครราชทูตยอรมัน และ ภริยา รวมทั้งท่านอดีตนายกสมาคมฯ ท่านที่ปรึกษา และท่านผู้ใหญ่ของสมาคมฯ และ ของมูลนิธิวัฒนธรรมไทย เยอรมัน',
                  wrap: true,
                  contents: []
                },
                {
                  type: 'text',
                  text: 'ในวันพุธที่ 20 เมษายน พ.ศ. 2565 เวลา 14.00 น. ณ บริเวณศาลาไทย มูลนิธิวัฒนธรรมไทย เยอรมัน (สถาบันเกอเธ่)',
                  wrap: true,
                  contents: []
                }
              ]
            },
            footer: {
              type: 'box',
              layout: 'horizontal',
              spacing: 'md',
              contents: [
                {
                  type: 'spacer',
                  size: 'xxl'
                },
                {
                  type: 'button',
                  action: {
                    type: 'uri',
                    label: 'เส้นทาง',
                    uri: 'https://www.google.com/maps/dir/?api=1&destination=Goethe-Institut+Thailand'
                  },
                  flex: 2
                },
                {
                  type: 'button',
                  action: {
                    type: 'uri',
                    label: 'อ่านเพิ่มเติม',
                    uri: 'https://vtd-thai.or.th/1120-2/'
                  },
                  flex: 3,
                  style: 'secondary'
                },
                {
                  type: 'button',
                  action: {
                    type: 'uri',
                    label: 'บอกต่อ',
                    uri: 'https://liff.line.me/1657061659-9mX4RN6v'
                  },
                  flex: 2,
                  style: 'primary'
                }
              ]
            }
          }          
          
    }
}

useEffect(() => {

  setmessages(messages => ([...messages, flexMessages.songkran65]))
    // liff.init({
    //     liffId: '1657061659-9mX4RN6v', // Use own liffId
    //     withLoginOnExternalBrowser: true, // Enable automatic login process
    // }).then( async () => {

    //     // Start to use liff's api
    //     setmessages(messages => ([...messages, flexMessages.songkran65]))
    // });
    // return () => {

    // };
}, []);

useEffect(() => {

    buildMessages(messages).then(messages => {
        if (liff.isApiAvailable('shareTargetPicker')) {
            liff.shareTargetPicker(messages).then(_ => {
                liff.closeWindow()
            });
        }
    })

    
    return () => {

    };
}, [messages]);


  return (
    <Page pageTitle={intl.formatMessage({ id: 'share_target' })}>
    <Typography>{intl.formatMessage({ id: 'share_target' })}</Typography>
    {/* <Typography>{messages.map(m => m)}</Typography> */}
    {/* <Typography>{JSON.stringify(profile)}</Typography>
    <Typography>{JSON.stringify(context)}</Typography> */}
    </Page>
  )
}
export default ShareTarget
