const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const {User} = require("./models/User"); //User 모델 가져오기

const config = require('./config/key') //key.js 파일 통해 개발/배포용 MONGO URI 분기 



//bodyParser : 클라이언트에서 가져온 정보를 서버에서 분석할 수 있게 해준다.
//bodyParser에 옵션 : application/x-www-form-urlencoded 타입으로 된걸 분석해서 가져옴
app.use(bodyParser.urlencoded({extended: true}));

//application/json 타입으로 된 것을 분석해서 가져옴
app.use(bodyParser.json());


const mongoose = require('mongoose');
const { json } = require('body-parser'); //bodyParser 가져온다
mongoose.connect(config.mongoURI, { //config.mongoURI : config > dev.js 안에 있는 mongoURI 연결
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify:false
}).then(() => console.log('MongoDB Connected..'))
  .catch(err => console.log(err))
  
app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세욤!!!! :D ')
})



//회원 가입을 위한 router 생성
app.post('/register', (req, res) => {
  //회원가입할 때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body) //bodyparser를 이용해서 클라이언트한테 받아온 정보를 담아준다
  //-> bodyParser를 통해 req.body를 json형식으로 가져온다


  user.save((err, userInfo) => {//몽고DB 메소드 : 정보들이 user 모델에 저장됨
    if(err) return res.json({success: false, err}) //eror를 json형식으로 전달
    return res.status(200).json({ //res.status(200) : 성공
      success:true
    })
  }) 
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

