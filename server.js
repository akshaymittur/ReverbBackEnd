const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const db = require('knex')

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
	database.users.push({
		id:'124',
		name: name,
		email: email,
		text: [],
		joined: new Date()
	})
	res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params
	let found = false
	database.users.forEach(user => {
		if (user.id === id) {
			found = true
			return res.json(user)
		}
		if (!found) {
			res.status(400).json('No User')
		}
	})
})

app.put('/notesave', (req, res) => {
	const { text, id } = req.body
	let found = false
	database.users.forEach(user => {
		if (user.id === id) {
			found = true
			user.notes.push(text)
			return res.json(user)
		}
		if (!found) {
			res.status(400).json('Not Found')
		}
	})
})

app.post('/getnotes', (req, res) => {
	const { id } = req.body
	let found = false
	database.users.forEach(user => {
		if (user.id === id) {
			found = true
			return res.json(user.notes)
		}
		if (!found) {
			res.status(400).json('Not Found')
		}
	})
})

app.delete('/deletenote', (req, res) => {
	const { note } = req.body
	let found = false
	database.users.forEach(user => {
		user.notes.forEach(text => {
			if (text === note) {
			found = true
			user.notes = user.notes.filter(lol => { 
    			return lol !== note
				})
		}
		return user.text
		})
		
		if (!found) {
			res.status(400).json('Not Found')
		}
	})
})

app.listen(3000, () => {
	console.log('Working')
})

/*/ this is Working
/signin post success/fail
/register post user
/profile/:userId get user
/notesave put user*/