const Task = require('../models/Tasks')

const TaskController = {
	async create(req, res) {
		try {
			const task = await Task.create({ ...req.body, completed: false })
			res.status(201).send({ message: 'Task created', task })
		} catch (error) {
			console.error(error)
			res.status(500).send({ message: 'error', error })
		}
	},
	async getAll(req, res) {
		try {
			const tasks = await Task.find()
			res.status(200).send({ message: 'todo ok', tasks })
		} catch (error) {
			res
				.status(500)
				.send({ message: 'Ha habido un problema al recuperar tareas' })
		}
	},
	async getById(req, res) {
		try {
			const task = await Task.findById(req.params._id)
			res.status(200).send(task)
		} catch (error) {
			res.status(500).send({ message: 'Error al recuperar tarea por id' })
		}
	},
	async complete(req, res) {
		try {
			const task = await Task.findByIdAndUpdate(
				req.params._id,
				{ completed: true },
				{ new: true }
			)
			res.status(200).send({ message: 'tarea completada', task })
		} catch (error) {
			res.status(500).send({ message: 'Error al completar tarea' })
		}
	},
	async updateTask(req, res) {
		try {
			const task = await Task.findByIdAndUpdate(
				req.params._id,
				{ title: req.body.title },
				{ new: true }
			)
			res.status(200).send({ message: 'tarea actualizada', task })
		} catch (error) {
			res.status(500).send({ message: 'Error al actualizar tarea' })
		}
	},
	async delete(req, res) {
		try {
			const task = await Task.findByIdAndDelete(req.params._id)
			res.send({ task, message: 'Product deleted' })
		} catch (error) {
			console.error(error)
			res.status(500).send({
				message: 'there was a problem trying to remove the publication',
			})
		}
	},
}

module.exports = TaskController