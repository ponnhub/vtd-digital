import liff from '@line/liff';
import { useEffect, useState, useMemo } from "react";
import {
    useLocation
  } from "react-router-dom";
const luxon = require('luxon');
const DateTime = luxon.DateTime;


function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
  }

function SharePage () {


    let query = useQuery();

  const [context, setcontext] = useState({});
  const [profile, setprofile] = useState({});
  const [messages, setmessages] = useState([]);


  const onServer = !window.location.href.includes('ngrok'); // it's localhost on Firebase
  let urlPrefix = onServer ? 'https://api.vtd-thai.or.th' : process.env.REACT_APP_API_URL
  // console.log('====================================');
  // console.log(urlPrefix);
  // console.log('====================================');
  //'https://27d1-122-155-138-34.ap.ngrok.io' //onServer ? 'https://api.vtd-thai.or.th' : 'https://edfe-122-155-138-34.ap.ngrok.io' //'http://localhost:8080'

  async function loadMessage(messageId) {

    fetch(`${urlPrefix}/loadflexmessage/${messageId}`, {
        method: 'GET'
      })
    //   .then(res => {
    //       if (res.status === 200) {
    //         console.log(JSON.stringify(res));
    //         console.log(`message loaded`);

    //     }
    // })
    .then(res => res.json())
    .then(flexMessage => {
        if (flexMessage) {
            setmessages(messages => ([...messages, ...flexMessage]))
        } else {
            liff.closeWindow()
        }

    })
    // .then(_ => authenticate(user))
    .catch(err => window.alert(err))
  }

    // function buildMessages(messages) {
    //     return new Promise((resolve, reject) => {
    //         resolve([.songkran65])
    //     })
    // }

  useEffect(() => {


    liff.init({
      liffId: '1657061659-9mX4RN6v',
      withLoginOnExternalBrowser: true, // Enable automatic login process
    }).then(_ => {
      liff.getProfile().then( async user => {

        setprofile(user)

        async function getcontext() {
          let context = liff.getContext()

          setcontext(context)
          // setmessages(messages => ([...messages, flexMessages.songkran65]))
      }
      // async function getprofile() {
      //     liff
      //         .getProfile()
      //         .then((profile) => {
      //             setprofile(profile)
      //             setAuth({ isAuthenticated: true, ...profile })
      //         })
      //         .catch((err) => {
      //             console.log("error", err);
      //         });

      // }

      getcontext()
      // getprofile()

      })
    })
    //   else {
    //     navigate('/', { replace: true })
    //     // if (!liff.isLoggedIn()) liff.login()
    //   }

    return () => {

    };
}, []);


useEffect(() => {

    if (context.type && profile.userId) {

        let now = DateTime.utc().toFormat('yyyy-MM-d hh:mm:ss')
        let data = {
            ...profile,
            groupId: context.groupId,
            lastLoggedIn: {
                type: context.type,
                datetime: now
            }
        }
        fetch(`${urlPrefix}/newuser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(res => {
              if (res.status === 200) {
                // console.log(JSON.stringify(res));
                // console.log(`user saved`);
                let mode = query.get('mode')
                if (mode && mode === 'redirect') {
                    let url = query.get('url')
                    window.open(url)
                    liff.closeWindow()
                    return
                }

                let messageId = query.get('messageid')
                loadMessage(messageId)
            }
        })
        // .then(_ => authenticate(user))
        .catch(err => window.alert(err))

        if (context.type === 'group') {
            let userGroupData = {
                userId: profile.userId,
                groupId: context.groupId,
                joined: now,
                lastLoggedIn: now
                }


            fetch(`${urlPrefix}/usergroups`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userGroupData)
                })
                .then(res => {
                    if (res.status === 200) {
                    // console.log(JSON.stringify(res));
                    // console.log(`user's group saved`);
                }
            })
            // .then(_ => authenticate(user))
            .catch(err => window.alert(err))
        }
    }

    return () => {

    };
}, [context, profile]);



useEffect(() => {

    // buildMessages(messages).then(messages => {
    if (messages.length && liff.isApiAvailable('shareTargetPicker')) {
        liff.shareTargetPicker(messages.slice(0, 5)).then(_ => {
            liff.closeWindow()
        });
    }
    // })


    return () => {

    };
}, [messages]);

    return (<div>
        <div>Inhalte werden gerade vorbereitet...</div>        
      </div>
      )
}

export default SharePage