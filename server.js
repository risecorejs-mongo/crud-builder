const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = 3000

const validator = require('@risecorejs-mongo/validator/middleware')
const only = require('@risecorejs/only/middleware')

connect().catch(err => console.log(err));

async function connect() {
    await mongoose.connect('mongodb://127.0.0.1:27018',{
        user: 'root',
        pass: 'password',
        dbName: 'meets'
    });
}
const cors = require("cors");

const UserSchema = new mongoose.Schema({
    id: Number,
    role: String,
    name: String,
    info: Object
})

const User = mongoose.model('User', UserSchema)

const endpoints = require('./test')

app.use(validator())
app.use(only())


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',async  (req, res) => {
    let result ={}
    //////////////////////////////////////////////////
    result = await User.find({}).sort({_id:'DESC'})
    // result = await User.create({
    //     role: 'public speaker',
    //     name: 'Andrei Lemeshev',
    //     info: '12'
    // })

    //////////////////////////////////////////////////
    res.json({result})
})

app.post('/', endpoints.create)



app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})