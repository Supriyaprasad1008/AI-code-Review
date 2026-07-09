// // CRITICAL FLAWS: Hardcoded secret, SQL Injection, and data leak
// const dbUrl = "mongodb://admin:SecretPass123@localhost:27017/myApp"; 

// app.post('/user', async (req, res) => {
//   // 1. DANGEROUS: Direct injection threat if req.body.id is an object or query exploit
//   const user = await db.collection('users').findOne({ userId: req.body.id }); 
  
//   // 2. LEAK: Sends private fields like passwords/hashes to the public frontend
//   res.json(user); 
// });