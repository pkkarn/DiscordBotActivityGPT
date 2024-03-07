const TaskModel = require('../models/TaskSchema')

module.exports = {
    async addTask(title, description, project, discordId, username) {
        if(title.trim().length === 0) {}
        if(description.trim().length === 0) {}
        if(discordId.trim().length === 0) {}
        if(username.trim().length === 0) {}

        const task = await TaskModel.create({title, description, project: [project], discordId, username})
        return task.toString()
    },

    async findAndReturnTask(username, date) {
        console.log(username, date)
        const startDate = new Date(date);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 1);
        
        const data = await TaskModel.find({username: username, 'timestamp.machineReadable': {
            $gte: startDate,
            $lt: endDate
        }})
        console.log(data)
        if(data.length === 0) {
            throw new Error('No task available')
        } 
        return data[0].description;
    }
}