const express=require('express');
const app=express()
const aiRoutes=require('./routes/aiRoutes')
const cors=require('cors')
app.use(cors())
app.use(express.json())
app.get('/', (req,res)=>{
    res.send('hello world')
})
app.use('/ai', aiRoutes)

module.exports=app