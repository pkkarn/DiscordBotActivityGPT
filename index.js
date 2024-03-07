const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits, Events, Collection } = require("discord.js");
const connectDB = require('./db')
const { addTask } = require('./services/task')
const { addTaskModalInteraction } = require('./components')
const { token } = require('./config.json')


connectDB;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands"); // ./commands
console.log('foldersPath', foldersPath);
const commandFolders = fs.readdirSync(foldersPath); // ['add_tasks', 'some_other_folder']

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder); // ./commands/add_task
  console.log("commandsPath", commandsPath);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    console.log('filePath', filePath);
    const command = require(filePath)

    if('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command)
    } else {
        console.log('[WARNING] The command is not valid')
    }
  }
}

client.on(Events.ClientReady, () => {
  console.log(`Logged in succesfully`);
});

// client.on(Events.MessageCreate, (message) => {
//   console.log("message", message);
// });
/**
 * Todo Task:
 * 
 * - Find information that can be used to identify users
 * - timestamp detection using openai
 * - 
 */

// Async Intreraction Management
client.on(Events.InteractionCreate, async (interaction) => {
    if(interaction.isModalSubmit()) {
        if (interaction.customId === 'addTask') {
            const title = interaction.fields.getTextInputValue('taskTitle');
            const descripiton = interaction.fields.getTextInputValue('taskDescription');
            const project_name = interaction.fields.getTextInputValue('taskProject');
            const createdTask = await addTask(title, descripiton, project_name, interaction.user.id, interaction.user.username)
            await interaction.reply(`Task has been created: ${createdTask}`)
        }
    }
    // https://old.discordjs.dev/#/docs/discord.js/14.14.1/class/StringSelectMenuInteraction?scrollTo=values
    // when project got selected
    if(interaction.isStringSelectMenu()) {
      if(interaction.customId === 'selectProject') {
        const selectedProject = interaction.values[0]
        await addTaskModalInteraction(interaction, selectedProject)
      }
    }
})

// Commands Interaction Management
client.on(Events.InteractionCreate, async (interaction ) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {  
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});
  
client.login(
  token
);
