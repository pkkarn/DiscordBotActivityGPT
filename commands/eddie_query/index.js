const { SlashCommandBuilder } = require("discord.js");
const { extractUsernameAndDate } = require("../../utils/index")
const {findAndReturnTask} = require("../../services/task")
module.exports = {
  data: new SlashCommandBuilder()
  .setName('eddie_query') // Set the name of your command
  .setDescription('Ask question') // Set a description for your command
  .addStringOption(option => 
    option.setName('question') // The name of the input field
          .setDescription('Ask your question') // Description of the input field
          .setRequired(true)), // Make this field required
  async execute(interaction) {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
  
    if (commandName === 'eddie_query') {
      const question = interaction.options.getString('question');
      await interaction.deferReply();
    
      const queryParams = await extractUsernameAndDate(question)
      const {username, date} = JSON.parse(queryParams);
      // Process the question here

      try {
        const description = await findAndReturnTask(username, date)
        await interaction.editReply(description);
      } catch(err) {
        console.log(err)
        await interaction.editReply('No task available');
      }
    }
  },
};
