const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

const cors = require('cors')
app.use(cors())

const { expressjwt: expressJWT} = require('express-jwt')
const config = require('./config')
app.use(expressJWT({secret:config.jwtSecretKey,algorithms:['HS256']}).unless({path:[/^\/api\//]}))



app.use(function(req,res,next){
    res.cc = function(err,status=1){
        res.send({
            status,
            message:err instanceof Error ? err.message : err
        })
    }
    next()
})

const joi = require('joi')
app.use(function(err,req,res,next){
    if(err instanceof joi.ValidationError) return res.cc(err)
    if(err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    res.cc(err)
})



const userRouter = require('./router/user')
app.use('/api',userRouter)
const userinfoRouter = require('./router/userinfo')
app.use('/my',userinfoRouter)

app.listen(3007,function(){
    console.log('server is running......')
})