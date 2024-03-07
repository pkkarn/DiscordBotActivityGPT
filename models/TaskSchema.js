const moment = require('moment')
const mongoose = require('mongoose');
const { availableProjects } = require('../default.json')
const Schema = mongoose.Schema;

const TaskSchema = Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
    description: {
		type: String,
		required: true,
		unique: true,
	},
    discordId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
	project: {
		type: [String],
		enum: availableProjects,
		default: ['GoMad'],
	},
    timestamp: {
		machineReadable: { type: Date, default: Date.now, immutable: true },
		humanReadable: {
			type: String,
			default: () => moment().format('MMMM Do YYYY, h:mm:ss a'),
			immutable: true,
		},
	},
}, {timestamp: true});

module.exports = mongoose.model('TaskSchema', TaskSchema);