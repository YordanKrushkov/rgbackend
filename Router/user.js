const express = require('express');
const router = express.Router();
const {register,login, verify, getuser,updateUser}=require('../Controllers/auth')

router.post('/register', async (req, res) => {

  await register(req,res);

})
router.post('/login', async (req,res)=>{
  
await login(req,res)
})
router.post('/verify', async (req,res)=>{  
await verify(req,res)

})
router.post('/update', async (req,res)=>{  
await verify(req,res)

})
router.get('/user', async(req,res)=>{
  await getuser(req,res)
})
router.post('/updateUser', async(req,res)=>{
  await updateUser(req,res)
})
module.exports = router;