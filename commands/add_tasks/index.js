const { SlashCommandBuilder } = require("discord.js");
const { chooseProject } = require('../../components')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add_task")
    .setDescription("Used to add task"),
  async execute(interaction) {
    // First choose project this will trigger interaction create and here
    chooseProject(interaction)
  },
};
