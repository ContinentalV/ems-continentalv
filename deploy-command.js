const {REST, Routes} = require('discord.js');
require('dotenv').config();
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Grab all the command files from the commands directory you created earlier
const FolderPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(FolderPath);
for (const folder of commandFolders) {
    const commandsPath = path.join(FolderPath, folder);
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter(file => file.endsWith('.js'));

    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
        console.log(`Loading command ${file}`);
        const command = require(`./commands/${folder}/${file}`);
        commands.push(command.data.toJSON());
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST({version: '10'}).setToken(token);

// and deploy your commands!
(async () => {
    try {
        console.log(
            `Started refreshing ${commands.length} application (/) commands.`,
        );

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            {body: commands},
        );
        //! If you want to deploy global commands, use the following line instead: const data = await rest.put(
        // Routes.applicationGuildCommands(clientId),
        // { body: commands },
        // );

        console.log(
            `Successfully reloaded ${data.length} application (/) commands.`,
        );
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();
