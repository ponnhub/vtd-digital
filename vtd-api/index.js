require('dotenv').config({path: __dirname + '/.env'})
const google = require('googleapis')
const { default: axios } = require("axios");

const express = require('express')

const db = require('./db')
const pool = db.pool;
const app = express()
const port = 3001
const bodyParser = require("body-parser");
const User = require('./models/user');
 

//Allow all requests from all domains & localhost
app.all('/*', function (req, res, next) {
    // console.log(req);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//member
//GET

app.get('/', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'build', 'index.html'));

    // let params = new URLSearchParams('Sex=ชาย&Age=10 - 20 ปี&Study=ปริญญาตรี&Job=นักเรียน / นักศึกษา&Income=ต่ำกว่าหรือเท่ากับ 10,000 บาท&Home_type=คอนโด/อพาร์ทเมนท์&Home_own=ของสมาชิกในครอบครัว&Car_licence=มี&Hobby=ดูหนัง / ซีรีย์, ร้อง / เล่น / ฟัง ดนตรี, อ่านหนังสือ, ท่องเที่ยว, เล่นเกม, ช็อปปิ้งออนไลน์&Transport=รถยนต์ส่วนตัว, BTS/MRT, รถเมล์ / รถตู้ / รถจักรยานยนต์รับจ้าง, เดิน&Movie=Action / บู๊, Fantasy / แฟนตาซี, Comedy / ตลก, Animation / การ์ตูน, Romantic Comedy / หนังรักแนวตลก&Music=ป็อป&Travel=ทะเล&Social=Facebook, Instagram, Twitter, Line, Youtube&Phone_system=iOS&Pub=นานๆที&Cigarette=ดื่ม&Alcohol=ไม่สูบ&Pet=เลี้ยง&Animal=สุนัข, แมว&Dream=มี')

    // axios.get(`https://openapi.botnoi.ai/service-api/areyousingle?${params}`, {
    //     headers: {
    //         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDk0ODkxMzMsImlkIjoiYWY5MjQ1NzMtNDhjNy00OGI2LThmNjUtZjg5NWNjOTBkMDk3IiwiaXNzIjoiTmhteTJNckJra2tYNWFta3hvOEFFcWNFbnJSbFYzRTgiLCJuYW1lIjoiQ2hhbG9lbXBob2wiLCJwaWMiOiJodHRwczovL3Byb2ZpbGUubGluZS1zY2RuLm5ldC8waFVhTWFNVXJtQ2s1d0dDQmlxLTExR1V4ZEJDTUhOZ3dHQ0N0RElBRVlWQzFkZlIxS0dTd1JMbElSVXlvSWZSNGNIM3BIZndVUkF5a0kifQ.IgkVdbmi2Qz5_l93sXOxQdsAPhMxw9MBnyUZ_2z6iv4'
    //     }
    // })
    // .then(response => console.log(response.data))
    // .then( res.status(200).end());

    console.log('passed /');
    res.send('HELLO from VTD API')
})

app.post('/members', async function (req, res) {
    let name = req.body.name
    console.log(name);
    try {
        const result = await pool.query("select id, title, name, surname, yearEnrolled from members WHERE name LIKE ? OR surname LIKE ?", [`%${name}%`, `%${name}%`]);
        // console.log(result);
        res.send(result);
    } catch (err) {
      console.log(err.code);
        throw err;
    }
})


app.post('/newuser', async function (req, res) {
    
    console.log(req.body);
    let user =  new User(req.body)
    console.log('====================================');
    console.log(user);
    console.log('====================================');
    
    try {
        const result = await pool.query(`INSERT INTO newusers (${user.toSqlFields()}) VALUES (${user.toSqlPlaceholders()}) 
        ON DUPLICATE KEY UPDATE ${user.toSqlParamsAll()}`, user.toSqlValues());
        console.log(result);
        // console.log(JSON.stringify(result));
        res.send(true);
    } catch (err) {
        res.send(err)
        throw err;
    }
})

app.get('/loadflexmessage/:id' , function (req, res) {

    let id = req.params.id
    console.log(id);

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
                        uri: `https://liff.line.me/1657061659-9mX4RN6v/?messageid=${id}`
                    },
                    flex: 2,
                    style: 'primary'
                    }
                ]
                }
            }          
            
        },
        songkran652: {
            type: 'flex',
            altText: 'งานพิธีสงกรานต์ ๖๕ สรงน้ำพระ รดน้ำขอพร ฯพณฯ เอกอัครราชทูตเยอรมัน อดีตนายกสมาคมฯ  ที่ปรึกษา และผู้ใหญ่',
            contents: {
                type: 'bubble',
                size: 'giga',
                hero: {
                  type: 'image',
                  url: 'https://vtd-thai.or.th/wp-content/uploads/2022/04/p1-1.jpg',
                  size: 'full',
                  aspectRatio: '2:1.6',
                  aspectMode: 'cover'
                },
                body: {
                  type: 'box',
                  layout: 'vertical',
                  spacing: 'md',
                  contents: [
                    {
                      type: 'text',
                      text: 'งานพิธีสงกรานต์ สรงน้ำพระ รดน้ำขอพร ฯพณฯ เอกอัครราชทูตเยอรมัน อดีตนายกสมาคมฯ  ที่ปรึกษา และผู้ใหญ่ ประจำปี 2565',
                      weight: 'bold',
                      size: 'lg',
                      wrap: true,
                      contents: []
                    },
                    {
                      type: 'text',
                      text: 'ในวันพุธที่ ๒๐ เมษายน ๒๕๖๕  เวลา ๑๔.๐๐น. สมาคมนักเรียนเก่าเยอรมัน ในพระบรมราชูปถัมภ์ ร่วมกับมูลนิธิวัฒนธรรมไทย-เยอรมัน (THAI DEUTSCHE KULTURSTIFTUNG) จัดงานพิธีสงกรานต์ เพื่อสรงน้ำพระ รดน้ำขอพร ฯพณฯ เอกอัครราชทูตเยอรมัน อดีตนายกสมาคมฯ  ที่ปรึกษา และผู้ใหญ่ ที่ให้การสนับสนุนสมาคมฯ',
                      size: 'sm',
                      wrap: true,
                      contents: []
                    },
                    {
                      type: 'text',
                      text: 'ณ บริเวณลานด้านหน้ามูลนิธิวัฒนธรรมไทย-เยอรมัน (สถาบันเกอเธ่) โดยพลอากาศเอกเรืองวิทย์ ศรีนวลนัด นายกสมาคมฯ ได้ให้เกียรติ กล่าวต้อนรับและเปิดงาน พร้อมกับเอกอัครราชทูตเยอรมนีประจำประเทศไทย H.E. Georg Schmidt และมี Mr. Joachim Hecker  ทูตวัฒนธรรมเยอรมัน ทูตทหาร OTL Philipp Doert และภริยา มาร่วมงาน',
                      size: 'sm',
                      wrap: true,
                      contents: []
                    },
                    {
                      type: 'text',
                      text: 'โดยผู้มีเกียรติ ผู้รับชมการแสดงมีความประทับใจและได้ขอขอบคุณในการจัดงานครั้งนี้ สำหรับกิจกรรมภายในงานดังกล่าว ประกอบด้วย หุ่นละครเล็ก การตีกลอง เล่าเรื่องราว   การรบของพระราม',
                      size: 'sm',
                      wrap: true,
                      contents: []
                    },
                    {
                      type: 'text',
                      text: 'โดยโรงเรียนจ่าอากาศ ยศ.ทอ. และมีอาหารไทยให้บริการแก่ผู้เข้าร่วมงาน อาทิ ข้าวเหนียวมะม่วง ลูกชุบ น้ำมะตูม',
                      size: 'sm',
                      wrap: true,
                      contents: []
                    },
                    {
                      type: 'text',
                      text: 'หลังจากการแสดงเสร็จสิ้น แขกผู้มีเกียรติได้ร่วมพิธีสรงน้ำพระ ขอพร รดน้ำดำหัวผู้ใหญ่และร่วมเลี้ยงสังสรรค์ รวมทั้งแสดงความยินดีต่อนายกสมาคมฯ ที่ได้รับการโปรดเกล้า โปรดกระหม่อม พระราชทานยศ เป็น พลอากาศเอก',
                      size: 'sm',
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
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'box',
                          layout: 'horizontal',
                          spacing: 'md',
                          action: {
                            type: 'uri',
                            label: 'ชมคลิป',
                            uri: 'https://www.youtube.com/watch?v=fOetUL8Q5fg'
                          },
                          contents: [
                            {
                              type: 'text',
                              text: 'ชมคลิป',
                              flex: 1,
                              align: 'end',
                              gravity: 'center',
                              style: 'italic',
                              contents: []
                            },
                            {
                              type: 'image',
                              url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_(2017).svg/2560px-YouTube_full-color_icon_(2017).svg.png',
                              flex: 1,
                              aspectRatio: '1:1',
                              aspectMode: 'fit'
                            },
                            {
                              type: 'filler',
                              flex: 2
                            }
                          ]
                        },
                        {
                          type: 'box',
                          layout: 'horizontal',
                          spacing: 'md',
                          contents: [
                            {
                              type: 'button',
                              action: {
                                type: 'uri',
                                label: 'อ่านและดูภาพบนเว็บ',
                                uri: 'https://liff.line.me/1657061659-9mX4RN6v/?mode=redirect&url=https://vtd-thai.or.th/songkran65-2'
                              },
                              flex: 3,
                              color: '#000000FF',
                              style: 'primary'
                            },
                            {
                              type: 'button',
                              action: {
                                type: 'uri',
                                label: 'บอกต่อ',
                                uri: 'https://liff.line.me/1657061659-9mX4RN6v/?messageid=songkran652'
                              },
                              flex: 2,
                              color: '#FFCC00FF',
                              style: 'secondary'
                            }
                          ]
                        },
                        {
                          type: 'box',
                          layout: 'vertical',
                          spacing: 'xs',
                          paddingAll: '10px',
                          contents: [
                            {
                              type: 'text',
                              text: 'มาร่วมกิจกรรมดี ๆ กับเราโดยติดตามได้ที่นี่ หรือเว็บไซต์ของสมาคมฯ ',
                              size: 'xxs',
                              align: 'end',
                              contents: []
                            },
                            {
                              type: 'text',
                              text: 'https://vtd-thai.or.th',
                              color: '#0160FCFF',
                              align: 'end',
                              action: {
                                type: 'uri',
                                label: 'web vtd ',
                                uri: 'https://liff.line.me/1657061659-9mX4RN6v/?mode=redirect&url=https://vtd-thai.or.th'
                              },
                              contents: []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              }
              
              
              
                       
        }
    }
    let activites = {
        type: 'flex',
        altText: 'กิจกรรม ส.น.ย.',
        contents: {
            type: 'bubble',
            direction: 'ltr',
            header: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: ' กิจกรรมดีๆ เหล่านี้รอท่านอยู่',
                  color: '#FFFFFFFF',
                  align: 'center',
                  contents: []
                }
              ]
            },
            body: {
              type: 'box',
              layout: 'vertical',
              spacing: 'sm',
              contents: [
                {
                  type: 'text',
                  text: 'งามสัมมนาวิชาการ',
                  align: 'center',
                  contents: []
                },
                {
                  type: 'text',
                  text: 'แรลลี่การกุศล',
                  align: 'center',
                  contents: []
                },
                {
                  type: 'text',
                  text: 'งาน Family Sport Day',
                  align: 'center',
                  contents: []
                },
                {
                  type: 'text',
                  text: 'กอล์ฟการกุศล',
                  align: 'center',
                  contents: []
                },
                {
                  type: 'text',
                  text: 'ทัศนาจรไปภูเขา/ทะเล',
                  align: 'center',
                  contents: []
                },
                {
                  type: 'text',
                  text: 'Oktoberfest\'22 Bangkok',
                  align: 'center',
                  contents: []
                },
                {
                  type: 'text',
                  text: 'und mehr ...',
                  align: 'center',
                  contents: []
                }
              ]
            },
            footer: {
              type: 'box',
              layout: 'vertical',
              spacing: 'md',
              contents: [
                {
                  type: 'text',
                  text: 'ดูข้อมูลเพิ่มเติมที่',
                  size: 'xxs',
                  color: '#DD0000FF',
                  align: 'center',
                  contents: []
                },
                {
                  type: 'button',
                  action: {
                    type: 'uri',
                    label: 'เว็บ VTD',
                    uri: 'https://liff.line.me/1657061659-9mX4RN6v/?mode=redirect&url=https://vtd-thai.or.th'
                  },
                  color: '#DD0000FF',
                  style: 'primary'
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  spacing: 'xl',
                  paddingAll: '5px',
                  backgroundColor: '#FFCC00FF',
                  cornerRadius: '5px',
                  contents: [
                    {
                      type: 'text',
                      text: '📞 โทร 02-677-6719',
                      align: 'center',
                      action: {
                        type: 'uri',
                        label: 'call vtd',
                        uri: 'tel:026776719'
                      },
                      contents: []
                    },
                    {
                      type: 'text',
                      text: '📞 085-689-8070',
                      align: 'center',
                      action: {
                        type: 'uri',
                        label: 'call vtd',
                        uri: 'tel:0856898070'
                      },
                      contents: []
                    }
                  ]
                },
                {
                  type: 'button',
                  action: {
                    type: 'uri',
                    label: 'บอกต่อ',
                    uri: 'https://liff.line.me/1657061659-9mX4RN6v/?messageid=songkran652'
                  }
                }
              ]
            },
            styles: {
              header: {
                backgroundColor: '#000000FF',
                separator: true,
                separatorColor: '#000000FF'
              },
              body: {
                separator: true,
                separatorColor: '#000000FF'
              }
            }
          }
              
          
    }

    res.send([flexMessages[id], activites])
})


app.post('/saveflexmessage' , async function (req, res) {

    let body = req.body
    try {
        const result = await pool.query(`INSERT INTO flexmessages (${user.toSqlFields()}) VALUES (${user.toSqlPlaceholders()}) 
        ON DUPLICATE KEY UPDATE ${user.toSqlParamsAll()}`, user.toSqlValues());
        console.log(result);
        // console.log(JSON.stringify(result));
        res.send(true);
    } catch (err) {
        res.send(err)
        throw err;
    }


    res.send(true)
})




app.post('/group', async function (req, res) {
    
    let user =  new User(req.body.profile)
    
    try {
        const result = await pool.query(`INSERT INTO newgroups (${user.toSqlFields()}) VALUES (${user.toSqlPlaceholders()}) 
        ON DUPLICATE KEY UPDATE ${user.toSqlParamsAll()}`, user.toSqlValues());
        console.log(result);
        // console.log(JSON.stringify(result));
        res.send(true);
    } catch (err) {
        res.send(err)
        throw err;
    }
})



app.post('/usergroups', async function (req, res) {
    
    let data =  req.body
    let keys = ['groupId', 'userId', 'joined', 'lastLoggedIn']
    try {
        const result = await pool.query(`INSERT INTO groupentries (${keys.join(',')}) VALUES (${Array(keys.length).fill("?").join(",")}) 
        ON DUPLICATE KEY UPDATE lastLoggedIn="${data.lastLoggedIn}"`, [data.groupId, data.userId, data.joined, data.lastLoggedIn]);
        console.log(result);
        // console.log(JSON.stringify(result));
        res.send(true);
    } catch (err) {
        res.send(err)
        throw err;
    }
})







app.post('/memberById', async function (req, res) {
    let id = req.body.id    
    try {
        const result = await pool.query("select * from members WHERE id = ?", [id]);
        res.send(result);
    } catch (err) {
      console.log(err.code);
        throw err;
    }
})

app.get('/members/:memberId', async function (req, res) {
    let memberId = req.params.memberId
    try {
        const result = await pool.query("select * from members WHERE cast(memberId  as numeric(38))  = ?", [memberId]);
        // console.log(result);
        res.send(result);
    } catch (err) {
      console.log(err.code);
        throw err;
    }
})

app.get('/user/:id', async function (req, res) {
    let id = req.params.id
    try {
        const result = await pool.query("select * from users WHERE id = ?", [id]);
        console.log(result);
        res.send(result);
    } catch (err) {
      console.log(err.code);
        throw err;
    }
})

//POST
app.post('/phoneuser', async (req, res) => {
    let user = req.body;
    try {
        const result = await pool.query(`INSERT INTO users (phoneNumber, uid, providerData) VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE uid='${user.uid}', providerData='${JSON.stringify(user.providerData)}'`, [user.phoneNumber, user.uid, JSON.stringify(user.providerData)]);
        // console.log(JSON.stringify(result));
        res.send(result);
    } catch (err) {
        res.send(err)
        throw err;
    }
});


app.get('/mobilenumber/:query', async (req, res) => {
    let query = req.params.query //req.params.query;

    try {

        //select id, mobile from members where mobile like concat('%', ?, '%') order by mobile like concat(?, '%') desc, ifnull(nullif(instr(mobile, concat(' ', ?)), 0), 99999), ifnull(nullif(instr(mobile, ?), 0), 99999), mobile;
        
        const allNumbers = await pool.query("select id, mobile from members where mobile like concat('%', ?, '%') order by mobile like concat(?, '%') desc, ifnull(nullif(instr(mobile, concat(' ', ?)), 0), 99999), ifnull(nullif(instr(mobile, ?), 0), 99999), mobile LIMIT 10", Array(4).fill(query));
                    
        res.send(allNumbers);
    } catch (err) {
      console.log(err.code);
        throw err;
    }
});

app.post('/updateuser', async (req, res) => {
    let user = req.body;

    const dbUser = await pool(query('SELECT 1 from users WHERE uid '))

    try {
        const result = await pool.query(`INSERT INTO users (phoneNumber, uid, providerData) VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE uid='${user.uid}', providerData='${JSON.stringify(user.providerData)}'`, [user.phoneNumber, user.uid, JSON.stringify(user.providerData)]);
        console.log(JSON.stringify(result));
        res.send(result);
    } catch (err) {
        res.send(err)
        throw err;
    }
});

// GET
app.get('/tasks', async (req, res) => {
    try {
        const result = await pool.query("select * from tasks");
        res.send(result);
    } catch (err) {
      console.log(err.code);
        throw err;
    }
});
 
// POST
app.post('/tasks', async (req, res) => {
    let task = req.body;
    console.log(task);
    try {
        const result = await pool.query("insert into tasks (description) values (?)", [task.description]);
        console.log(result);
        res.send(result);
    } catch (err) {
        throw err;
    }
});
 
app.put('/tasks', async (req, res) => {
    let task = req.body;
    try {
        const result = await pool.query("update tasks set description = ?, completed = ? where id = ?", [task.description, task.completed, task.id]);
        res.send(result);
    } catch (err) {
        throw err;
    } 
});
 
app.delete('/tasks', async (req, res) => {
    let id = req.query.id;
    try {
        const result = await pool.query("delete from tasks where id = ?", [id]);
        res.send(result);
    } catch (err) {
        throw err;
    } 
});
 
// pool.query = util.promisify(pool.query) // Magic happens here.

app.listen(port, () => console.log(`Listening on port ${port}`));