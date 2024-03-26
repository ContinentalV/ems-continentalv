const {Events} = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {


        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
            try {
                await command.execute(interaction)
            } catch (error) {
                console.error(`Error executing command ${interaction.commandName}: ${error}`);
            }
        } else if (interaction.isAutocomplete()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
            try {
                await command.autocomplete(interaction)
            } catch (error) {
                console.error(`Error executing command ${interaction.commandName}: ${error}`);
            }
        } else if (interaction.isModalSubmit()) {
            if (interaction.customId === 'nameModal') {
                const firstname = interaction.fields.getField('firstnameInput').value;
                const lastname = interaction.fields.getField('lastnameInput').value;
                const member = interaction.member;
                const newNickname = `${firstname} ${lastname}`;
                // TODO: Mettre le new pseudo en BDD
                try {
                    await member.setNickname(newNickname);
                    console.log(`Le pseudo de ${member.user.tag} a été changé en ${newNickname}`);
                } catch (error) {
                    console.error(`Une erreur s'est produite lors du changement du pseudo de ${member.user.tag}:`, error);
                }

                await interaction.reply({ content: 'Tu viens de changer ton nom RP par **'+ newNickname+'**', ephemeral: true });
            }
        }


        // if (!interaction.isChatInputCommand()) return;

        // const command = interaction.client.commands.get(interaction.commandName);

        // if (!command) {
        //   console.error(`No command matching ${interaction.commandName} was found.`);
        //   return;

        // }
        // try {
        //   await command.execute(interaction)
        // } catch (error) {
        //   console.error(`Error executing command ${interaction.commandName}: ${error}`);
        // }

    }
}