const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const {fetchPlayerNames} = require("../../function/functions");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('who')
        .setDescription('Qui est cette personne ? (avec ID)')
        .addStringOption(option =>
            option.setName('player_id')
                .setDescription('ID de la personne')
                .setRequired(true)
        ),
    async execute(interaction) {
        const playerId = interaction.options.getString('player_id');

        // Appeler la fonction fetchPlayerNames pour obtenir la liste des joueurs
        const playerNames = await fetchPlayerNames();
        // console.log(playerNames);

        // Trouver le joueur correspondant à l'ID fourni
        const player = playerNames.find(player => player.idIG == playerId);

        if (player) {
            console.log(`\x1b[33mWHO →\x1b[0m Commande /who exécutée par \x1b[36m${interaction.member.nickname}\x1b[0m pour connaitre >> \x1b[34m[ ${player.name} ]\x1b[0m`);
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Informations sur le joueur | ID: `'+ player.idIG +'`')
                .addFields({name: 'Nom du joueur', value: `${player.name}`, inline: true })
                .addFields({name: 'Discord ID', value: `<@${player.id}>`, inline: true });

            await interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            await interaction.reply({content: 'Le joueur ID `'+ playerId +'` n\'est pas en ville.', ephemeral: true});
        }
    },
};
