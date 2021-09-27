const mongoose = require('mongoose'); //몽구스 모듈 갖고온다

const userSchema = mongoose.Schema({ //몽구스 이용해서 스키마 생성
    name: { //필드 생성
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1 //중복 방지
    },
    password: {
        type: String, 
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { //User가 관리자가 될 수도 있고, 일반유저가 될 수도 있기 때문에 role 따로 줌
        type: Number,
        default: 0 //따로 지정 안하면 role default값으로 세팅
    },
    image: String,
    token: { //유효성
        type: String 
    },
    tokenExp: { //토큰 유효기간
        type:Number
    }
})

const User = mongoose.model('User', userSchema); //model(모델 이름, 스키마) : 스키마를 모델로 감싸준다

module.exports = {User} //다른곳에서도 쓸 수 있게 user을 export