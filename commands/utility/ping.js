const { SlashCommandBuilder } = require('discord.js')

const axios = require('axios');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Envoie les informations générales de continental V.'),
  async execute(interaction) {
    await interaction.reply({ content: 'Pong !', ephemeral: true });
  }
}