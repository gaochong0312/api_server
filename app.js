const express = require('express')
const app = express()
const joi = require('@hapi/joi')

const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use(function(req,res,next){
    res.cc = function(err,status=1){
        res.send({
            status,
            message:err instanceof Error ? err.message : err
        })
    }
    next()
})

app.use(function(err,req,res,next){
    if(err instanceof joi.ValidationError) return res.cc(err)
    res.cc(err)
})

const userRouter = require('./router/user')
app.use('/api',userRouter)


app.listen(3007,function(){
    console.log('server is running......')
})