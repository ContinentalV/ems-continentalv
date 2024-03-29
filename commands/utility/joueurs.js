const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const {fetchPlayerNames} = require("../../function/functions");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joueurs')
        .setDescription('Affiche la liste des joueurs en jeu'),
    async execute(interaction) {
        try {
            const playerNames = await fetchPlayerNames();

            const listStaff = ["318438930343002112", "747528099620585482", "322999136758661120","851528406867902544", "833753794361688075", "913556118976995338", "1036892376972677130", "713332268680347689", "342053636681105410","1182724262298124368", "913934870076596265", "771475814495420416", "643112876701253653", "693509228517654590", "962766278525870090","651421906217598998", "1079437284652359753", "321322322604589058", "198185822623629312", "710889929743532113", "465144095996772369", "899754842967396373", "869937709400096848"];

            playerNames.sort((a, b) => {
                const idA = typeof a.idIG === 'number' ? a.idIG : 0;
                const idB = typeof b.idIG === 'number' ? b.idIG : 0;
                return idA - idB;
            });

            let playerList = playerNames.map(player => `> - ${player.idIG} | ${player.name} - <@${player.id}>`).join('\n');
            if (playerList.length > 4095) {
                playerList = "Il y a trop de monde en ville pour tous les afficher !";
            }

            const totalPlayers = playerNames.length;
            const staffMembers = playerNames.filter(player => listStaff.includes(player.id));
            const totalStaffs = staffMembers.length;

            const embed = new EmbedBuilder()
                .setTitle('Liste des joueurs en jeu')
                .setDescription(playerList)
                .setColor('#1d2654');

            const embedstaff = new EmbedBuilder()
                .setTitle('Liste des staffs en jeu')
                .setDescription(`
          ${staffMembers.map(player => `\n> - ${player.idIG} | ${player.name} - <@${player.id}>`)}
        `)
                .addFields({ name: 'Ratio de staff : ', value: `${totalStaffs}/${totalPlayers}`, inline: true })
                .setColor('#ff0000');

            if (playerList.length < 4095) {
                interaction.reply({ embeds: [embed, embedstaff], ephemeral: true });
                console.log(`\x1b[33mJOUEURS →\x1b[0m Commande /joueurs exécutée par \x1b[36m${interaction.member.nickname}\x1b[0m | Il y a \x1b[34m[ ${totalPlayers} ]\x1b[0m joueurs en ville.`);
            } else {
                interaction.reply({ embeds: [embedstaff], ephemeral: true });
                console.log(`\x1b[33mJOUEURS →\x1b[0m Commande /joueurs exécutée par \x1b[36m${interaction.member.nickname}\x1b[0m | Il y a \x1b[34m[ ${totalPlayers} ]\x1b[0m joueurs en ville.`);
            }
        } catch (error) {
            console.error(error);
        }
    },
};



