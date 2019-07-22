const deleteNotes = (req, res, db) => {
	const { id, note } = req.body
	db('users').where({
		id: id
		})
	.update({
		notes: db.raw('array_remove(notes, ?)', [note])
	})
	.returning('notes')
	.then(notes => {
		res.json(notes)
	})
	.catch(err => res.status(400).json('Unable to Delete Notes'))
}

module.exports = {
	deleteNotes
}