const handleNotes = (req, res, db) => {
	const { id } = req.body
	db.select('notes').from('users').where('id', '=', id)
	.then(notes => res.json(notes))
	.catch(err => res.status(400).json('Unable to Get Notes'))
}

module.exports = {
	handleNotes
}