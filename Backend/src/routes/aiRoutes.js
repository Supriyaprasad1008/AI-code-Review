const express=require('express')
const aicontrollers=require('../controllers/aiController')
const router=express.Router()

router.post('/getResponse', aicontrollers.getResponse)


module.exports=router