const {Events, EmbedBuilder} = require('discord.js');
const {extraireNomApresTiret, verifierFormatDate} = require("../function/functions");
const {listChannels, roles} = require("../config");

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
            // Pour le /name
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

            // Pour le /absence
            if (interaction.customId === 'absenceModal') {
                const dateDebut = interaction.fields.getField('dateDebut').value;
                const dateFin = interaction.fields.getField('dateFin').value;
                const raison = interaction.fields.getField('raison').value;
                // TODO : Enregistrer en base de données les informations de l'absence pour le membre
                const member = interaction.member;
                if (!verifierFormatDate(dateDebut) || !verifierFormatDate(dateFin)) {
                    await interaction.reply({content:"Le format des dates doit être **JJ/MM/AAAA**. \nExemple : `04/04/2024`\nVeuillez réessayer.", ephemeral: true});
                    return;
                }
                const embedAbsence = new EmbedBuilder()
                    .setTitle("Absence de "+extraireNomApresTiret(member.nickname))
                    .setThumbnail("https://cdn-icons-png.flaticon.com/512/4784/4784979.png")
                    .setAuthor({name: member.nickname, iconURL: member.user.displayAvatarURL()})
                    .setFields({name: "Dates de l'absence", value: "```Du "+dateDebut+" au "+dateFin+"```", inline: false},
                        {name: "Raison HRP", value: "```"+raison+"```", inline: false})
                    .setColor('#FF5D7D')
                    .setTimestamp();

                const absence = listChannels.absence;
                const roleDirection = roles.DirectionRole;
                const absenceChannel = interaction.client.channels.cache.get(absence);
                if (absenceChannel) {
                    await absenceChannel.send({content: `<@&${roleDirection}>, ${extraireNomApresTiret(member.nickname)} a posé une absence.`, embeds: [embedAbsence]});
                    await member.send({
                        content: `> Vous venez de poser une absence du **${dateDebut}** au **${dateFin}**.
                        \n# Nous vous rappelons qu'il vous sera impossible de prendre votre service durant cette période.\n\nSi vous avez des questions, n'hésitez pas à contacter la direction de l'hôpital.`
                    });
                    await interaction.reply({
                        content: `> Vous venez de poser une absence du **${dateDebut}** au **${dateFin}**.
                        \nNous vous rappelons qu'il vous sera impossible de prendre votre service durant cette période.\n\nSi vous avez des questions, n'hésitez pas à contacter la <@&${roleDirection}>.`,
                        ephemeral: true
                    });
                }else {
                    console.error(`/ABSENCE → Impossible de trouver le canal avec l'ID ${absenceChannel}`);
                    await interaction.reply({
                        content: `ERROR : Impossible de trouver le canal avec l'ID ${absenceChannel}`,
                        ephemeral: true
                    });
                }
            }

            if (interaction.customId === 'cv') {
                interaction.name = interaction.fields.getField('name').value;
                console.log(interaction.name)
            }

        }

    }
}