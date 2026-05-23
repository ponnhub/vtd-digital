import { Typography } from '@mui/material'
import Page from 'material-ui-shell/lib/containers/Page'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import liff from '@line/liff';
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useNavigate } from 'react-router-dom';

const luxon = require('luxon');
const DateTime = luxon.DateTime;


const onServer = !window.location.href.includes('.local'); // it's localhost on Firebase
let urlPrefix = onServer ? 'https://api.vtd-thai.or.th' : 'http://localhost:8080'


const LineSignUp = () => {
  const intl = useIntl()

  const [context, setcontext] = useState({});
  const [profile, setprofile] = useState({});

  const { setAuth } = useAuth()
  const navigate = useNavigate()


  const authenticate = async (user) => {

    setAuth({ isAuthenticated: true, ...user })

    // let context =  liff.getContext()

    // await updateDbUser(user, context).then( success => {
    //   if (success) {
    //     let from = new URLSearchParams(location.search).get('from')

    //     if (from) {
    //       navigate(from, { replace: true })
    //     } else {
    //       navigate(redirectTo, { replace: true })
    //     }
    //   }

    // })
  }


useEffect(() => {


    if (liff.isInClient() || window.location.href.includes('ngrok')) {

        liff.getProfile().then( async user => {

          await authenticate(user)
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

      }
      else {
        navigate('/', { replace: true })
        // if (!liff.isLoggedIn()) liff.login()
      }

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
                console.log(JSON.stringify(res));
                console.log(`user saved`);

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
                    console.log(JSON.stringify(res));
                    console.log(`user's group saved`);
                }
            })
            // .then(_ => authenticate(user))
            .catch(err => window.alert(err))
        }
    }

    return () => {

    };
}, [context, profile]);


  return (
    <Page pageTitle={intl.formatMessage({ id: 'share_target' })}>
    <Typography>{intl.formatMessage({ id: 'share_target' })}</Typography>
    {/* <Typography>{messages.map(m => m)}</Typography> */}
    <Typography>{JSON.stringify(profile)}</Typography>
    <Typography>{JSON.stringify(context)}</Typography>
    </Page>
  )
}
export default LineSignUp
