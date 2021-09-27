if(process.env.NODE_ENV === 'production') { //개발환경일때 prod.js 사용하겠다
    module.exports = require('./prod')
} else { //배포환경일때 dev.js 사용하겠다
    module.exports = require('./dev')
}