const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'root',
    database : 'reverb'
  }
})

db.select('*').from('users').then(data => {
	console.log(data)
})

const app = express()

app.use(bodyParser.json())
app.use(cors())

const database = {
	users: [
	{
		id:'123',
		name: 'John',
		email: 'john@gmail.com',
		password: 'cookies',
		notes: ["Hello, Whats up?", "Remember to get groceries"],
		joined: new Date()
	}],
	login: [
	{
		id: '123',
		hash: '',
		email: 'john@gmail.com'
	}]
}

app.get('/', (req, res) => {
	res.send(database.users)
	
})

app.post('/signin',(req, res) => {
	if (req.body.email === database.users[0].email && 
		req.body.password === database.users[0].password) {
		res.json(database.users[0])
	} else{
		res.status(400).json('Error')
	}

})

app.post('/register', (req, res) => {
	const { email, name, password } = req.body
	db('users')
	.returning('*')
	.insert({
		email: email,
		name: name,
		notes: ['Welcome!', 'Hello!'],
		joined: new Date()
	})
	.then(user => {
		res.json(user[0])
	})
	.catch(err => res.status(400).json('Unable to register'))
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params
	db.select('*').from('users').where({
		id: id
	})
	.then(user => {
		if(user.length) {
			res.json(user[0])
		} else {
			res.status(400).json('Not Found')
		}
	})
	.catch(err => res.status(400).json('Error Getting User'))
})

app.put('/notesave', (req, res) => {
	const { text, id } = req.body
	db('users').where('id', '=', id)
	.update({
		notes: db.raw('array_append(notes, ?)', [text])
	})
	.returning('notes')
	.then(notes => {
		res.json(notes)
	})
	.catch(err => res.status(400).json('Unable to Get Notes'))
})

app.post('/getnotes', (req, res) => {
	const { id } = req.body
	db.select('notes').from('users').where('id', '=', id)
	.then(notes => res.json(notes[0]))
	.catch(err => res.status(400).json('Unable to Get Notes'))

})

app.delete('/deletenote', (req, res) => {
	const { id, note } = req.body
	db('users').where({
		id: id
		})
	.update({
		notes: db.raw('array_remove(notes, ?)', [note])
	})
	.returning('notes')
	.then(notes => {
		res.json(notes[0])
	})
	.catch(err => res.status(400).json('Unable to Delete Notes'))

})

app.listen(3000, () => {
	console.log('Working')
})

/*/ this is Working
/signin post success/fail
/register post user
/profile/:userId get user
/notesave put user*/