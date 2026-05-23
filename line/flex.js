class Flex {

  userslist(query, users) {

    let userRows = !users.length ? [{
      type: 'filler'
    }] :
      users.map(user => {

        console.log(user);
        return {
          type: 'box',
          layout: 'horizontal',
          contents: [
            user.title && {
              type: 'text',
              text: `${user.title}`,
              flex: 1,
              contents: []
            },
            {
              type: 'text',
              text: `${user.name}`,
              flex: 2,
              wrap: true,
              contents: []
            },
            {
              type: 'text',
              text: `${user.surname}`,
              flex: 2,
              wrap: true,
              contents: []
            },
            user.yearEnrolled && {
              type: 'text',
              offsetTop: '5px',
              text: `(${user.yearEnrolled})`,
              size: 'xxs',
              contents: []
            },
            // {
            //   type: 'box',
            //   layout: 'vertical',
            //   action: {
            //     type: 'postback',
            //     label: 'ดูคนนี้',
            //     displayText: `ดู${user.name}`,
            //     data: `mode=viewmember&id=${user.id}`
            //   },
            //   width: '24px',
            //   height: '16px',
            //   contents: [{
            //     type: 'text',
            //     text: '🔎',
            //     contents: []
            //   }]
            // }
          ]
        }
      })
    return {
      type: 'flex',
      altText: (users.length ? '' : 'ไม่พบ')  + `ผลการค้นหา "${query}" พบ ${users.length} รายการ`,
      contents: {
        type: 'bubble',
        size: 'giga',
        direction: 'ltr',
        header: {
          type: 'box',
          layout: 'vertical',
          contents: [{
            type: 'box',
            layout: 'horizontal',
            contents: [{
                type: 'box',
                layout: 'vertical',
                flex: 1,
                contents: [{
                  type: 'image',
                  url: 'https://vtd-thai.or.th/wp-content/uploads/2020/09/cropped-logo2.png',
                  aspectMode: 'fit'
                }]
              },
              {
                type: 'box',
                layout: 'vertical',
                flex: 9,
                contents: [{
                  type: 'text',
                  text: (users.length ? '' : 'ไม่พบ')  + `ผลการค้นหา "${query}"`,
                  align: 'center',
                  wrap: true,
                  contents: []
                }]
              }
            ]
          }]
        },
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [users.length && {
            type: 'text',
            text: (users.length ? '' : 'ไม่พบ')  + `พบ ${users.length} รายการ`,
            size: 'xxs',
            align: 'start',
            wrap: true,
            contents: []
          },
          {
            type: 'separator'
          },
          {
            type: 'box',
            layout: 'vertical',
            contents: userRows
          }]
        }
      }

    }
  }

  userBubble(user) {

    let keyValuePair = Object.entries(user).map(([k, v])=> {
      
        return v && v.length ? {
          type: 'box',
          layout: 'horizontal',
          spacing: 'md',
          contents: [
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: k,
                  size: 'sm',
                  align: 'end',
                  contents: []
                }
              ]
            },
            {
              type: 'box',
              layout: 'vertical',
              paddingAll: '2px',
              backgroundColor: '#BDEFFFFF',
              cornerRadius: '5px',
              contents: [
                {
                  type: 'text',
                  text: v ? v.length ? v : '-' : '-',
                  size: 'md',
                  wrap: true,
                  offsetStart: '10px',
                  contents: []
                }
              ]
            }
          ]
        }
        :
        {type: 'filler'}
      })

    return {
      type: 'flex',
      altText: `รายละเอียดสมาชิก ${user.name} ${user.surname}`,
      contents: {
        type: 'bubble',
        size: 'giga',
        direction: 'ltr',
        header: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'box',
              layout: 'horizontal',
              spacing: 'sm',
              contents: [
                {
                  type: 'text',
                  flex: 1,
                  text: `${user.title}`,
                  size: 'sm',
                  align: 'end',
                  contents: []
                },
                {
                  type: 'text',
                  flex: 5,
                  text: `${user.name} ${user.surname}`,
                  size: 'lg',
                  wrap: true,
                  contents: []
                }
              ]
            }
          ]
        },
        body: {
          type: 'box',
          layout: 'vertical',
          spacing: 'xs',
          contents: keyValuePair
        }
      }
      
      
    }
  }

}

module.exports = Flex