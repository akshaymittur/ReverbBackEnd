const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

const database = {
	users: [
	{
		id:'123',
		name: 'John',
		email: 'john@gmail.com',
		password: 'cookies',
		text: [],
		joined: new Date()
	}]
}

app.get('/', (req, res) => {
	res.send(database.users)
	
})

app.post('/signin',(req, res) => {
	if (req.body.email === databas.users[0].email && 
		req.body.password === databas.users[0].password) {
		res.json('Success')
	} else{
		res.status(400).json('Error')
	}

})

app.post('/register', (req, res) => {
	const { email, name, password } = req.body
	database.users.push({
		id:'123',
		name: name,
		email: email,
		password: password,
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
	const { id } = req.body
	let found = false
	database.users.forEach(user => {
		if (user.id === id) {
			found = true
			user.text.push("lol")
			return res.json(user.text)
		}
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