const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');

const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();
app.use(express.json());
app.use(cors())

// host : '127.0.0.1',
// user : 'postgres',
// password : 'password',
// database : 'smartb'
const saltRounds = 10;
const db = knex({
    client: 'pg',
    connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true
}
});


// db.select('*').from('users').then(data => {
//     console.log(data);               
// })
// app.get('/', (req, res)=> { res.send(database.users) })

app.get('/', (req, res)=> { res.send('it is working!') }) //new for heroku

app.post('/signin', (req,res) => {signIn.handleSignIn(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt, saltRounds)})

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on ${process.env.PORT}`)    // new for heroku
})

// app.listen(3000, () => {
//     console.log('app is running')
// })





















// const fs = require('fs')

// fs.readFile('./hello.text', (err, data) => {
//     if (err) {
//         console.log('errorrr')
//     }
//     console.log(data.toString())
// })

// const file = fs.readFileSync('./hello.text');
// console.log(file.toString())

// APPEND
// fs.appendFile('./hello.text', 'This is so cool', err => {
//     if (err) {
//         console.log(err)
//     }
// })

// WRITE
// fs.writeFile('bye.txt', 'Sad to see you go', err => {
//     if (err) {
//         console.log(err)
//     } 
// })

// DELETE
// fs.unlink('./bye.txt', err => {
//     if (err) {
//     console.log(err)
//     }
// })





// const express = require('express')

// const app = express();

// app.use(express.urlencoded({extended: false}));
// app.use(express.json());


// app.get('/', (req, res) => {
//     console.log(req.query)
//     req.body
//     req.header
//     req.params
//     res.send("getting root")
// })
// app.listen(3000)

////////////////////////////////////////////

// const user = {
//     name: 'Sally',
//     hobby: 'Soccer'
// }
// res.send(user)

// app.use((req, res, next) => {
//     console.log('heya')
//     next()
// })