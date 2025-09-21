const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

const cors = require('cors')
app.use(cors())

app.use(function(req,res,next){
    res.cc = function(err,status=1){
        res.send({
            status,
            message:err instanceof Error ? err.message : err
        })
    }
    next()
})

const { expressjwt: expressJWT} = require('express-jwt')
const config = require('./config')
app.use(expressJWT({secret:config.jwtSecretKey,algorithms:['HS256']}).unless({path:[/^\/api\//]}))


const userRouter = require('./router/user')
app.use('/api',userRouter)
const userinfoRouter = require('./router/userinfo')
app.use('/my',userinfoRouter)
const customersRouter = require('./router/customers')
app.use('/customers',customersRouter)


app.use(function(err,req,res,next){
    if(err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    res.cc(err)
})

app.listen(3007,function(){
    console.log('server is running....')
})