const handleSave = (req, res, db) => {
	const { text, id } = req.body
	db('users').where('id', '=', id)
	.update({
		notes: db.raw('array_append(notes, ?)', text)
	})
	.returning('notes')
	.then(notes => res.json(notes[0]))
	.catch(err => res.status(400).json('Unable to Get Notes'))
}

module.exports = {
	handleSave
}