const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, ButtonBuilder, ButtonStyle} = require('discord.js')

const axios = require('axios');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('name')
        .setDescription('Changer son nom et prénom RP'),
    async execute(interaction) {
        try {
            const member = await interaction.guild.members.fetch(interaction.user.id);
            const botMember = await interaction.guild.members.fetch(interaction.client.user.id);

            if (member.roles.highest.comparePositionTo(botMember.roles.highest) > 0) {
                await interaction.reply({content: "Change ton pseudo toi même ! Tu as un rôle plus haut que moi...", ephemeral: true});
            } else {
                const modal = new ModalBuilder()
                    .setCustomId('nameModal')
                    .setTitle('Nom et prénom RP');

                const firstname = new TextInputBuilder()
                    .setCustomId('firstnameInput')
                    .setLabel("Entrez votre prénom RP")
                    .setStyle(TextInputStyle.Short);

                const lastname = new TextInputBuilder()
                    .setCustomId('lastnameInput')
                    .setLabel("Entrez votre nom RP")
                    .setStyle(TextInputStyle.Short);

                const firstNameRow = new ActionRowBuilder().addComponents(firstname);
                const lastNameRow = new ActionRowBuilder().addComponents(lastname);

                modal.addComponents(firstNameRow, lastNameRow);

                await interaction.showModal(modal);

            }
        } catch (error) {
            console.error('Une erreur s\'est produite : ', error);
            await interaction.reply({
                content: "Une erreur s'est produite. Tu peux contacter <@297036747513135104> !",
                ephemeral: true
            });
        }
    }
}