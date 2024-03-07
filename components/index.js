const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");
const { availableProjects } = require('../default.json')

async function chooseProject(interaction) {
    const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('selectProject')
    .setPlaceholder('Choose A Project')
    .addOptions(
        availableProjects.map(project => {
            return new StringSelectMenuOptionBuilder().setLabel(project).setValue(project)
        })
    );

    const actionRow = new ActionRowBuilder().addComponents(selectMenu);

    await interaction.reply({ content: 'Please select a project:', components: [actionRow] })
}

async function addTaskModalInteraction(interaction, selectedProject) {
    //000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
    const modal = new ModalBuilder()
    .setCustomId('addTask')
    .setTitle('Add Task');
    // Add components to modal

    // Create the text input components
    const taskTitle = new TextInputBuilder()
    .setCustomId('taskTitle')
    // The label is the prompt the user sees for this input
    .setLabel("Task Title?")
    // Short means only a single line of text
    .setStyle(TextInputStyle.Short);

    const linkedProject = new TextInputBuilder()
    .setCustomId('taskProject')
    // The label is the prompt the user sees for this input
    .setLabel("Project Name")
    .setValue(selectedProject)
    // Short means only a single line of text
    .setStyle(TextInputStyle.Short);


    const taskDescription = new TextInputBuilder()
    .setCustomId('taskDescription')
    .setLabel("Task Description")
   
    // Paragraph means multiple lines of text.
    .setStyle(TextInputStyle.Paragraph);

    // An action row only holds one text input,
    // so you need one action row per text input.
    const firstActionRow = new ActionRowBuilder().addComponents(taskTitle);
    const secondActionRow = new ActionRowBuilder().addComponents(linkedProject);
    const thirdActionRow = new ActionRowBuilder().addComponents(taskDescription);

    // Add inputs to the modal
    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);
    interaction.selectedProject = selectedProject
    await interaction.showModal(modal);
}

module.exports = {
    addTaskModalInteraction,
    chooseProject
}