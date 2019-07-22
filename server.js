const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const register = require('./Controllers/register')
const profile = require('./Controllers/profile')
const signin = require('./Controllers/signin')
const save = require('./Controllers/save')
const get = require('./Controllers/get')
const del = require('./Controllers/del')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'root',
    database : 'reverb'
  }
})

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => res.send(db.users))

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

app.put('/notesave', (req, res) => { save.handleSave(req, res, db) })

app.post('/getnotes', (req, res) => { get.handleNotes(req, res, db) })

app.delete('/deletenote', (req, res) => { del.deleteNotes(req, res, db) })

app.listen(3000, () => {
	console.log('Working on Port 3000')
})
