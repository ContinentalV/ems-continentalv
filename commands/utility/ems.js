const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const {fetchPlayerNames} = require("../../function/functions");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ems')
        .setDescription('Liste des EMS'),
    async execute(interaction) {

        const { guild, client, member, options, user } = interaction
        try {
            const roleId = '1113289021481828372'; // ID du rôle EMS
            const excludedMemberId = '465144095996772369'; // ID de Getsu à exclure (ce fdp)
            const role = await interaction.guild.roles.fetch(roleId);
            const emsMembers = role.members;
            const flagDescription = '🚩 = joueur en ville';
            const offlineDescription = '🔴 = EMS hors service';
            const onlineDescription = '🟢 = EMS en service';

            const gradeOrder = [
                'EMT', 'EMS', 'ADS', 'INT', 'AMB', 'INF', 'INC', 'MED', 'MEG', 'CDS', 'DIR-MED', 'RH', 'DRH', 'DIR', 'CO-PDG', 'PDG'
            ];
            const playerNames = await fetchPlayerNames();
            const playerIds = playerNames.map(player => player.id);

            const emsMemberList = emsMembers
                .sort((a, b) => {
                    const gradeA = getGrade(a.displayName);
                    const gradeB = getGrade(b.displayName);
                    return gradeOrder.indexOf(gradeB) - gradeOrder.indexOf(gradeA);
                })
                .map(member => {
                    if (member.id === excludedMemberId) return null;
                    const grade = getGrade(member.displayName);
                    const statusSymbol = getStatusSymbol(member.roles.cache);
                    const flag = playerIds.includes(member.user.id) ? '🚩' : ''; // Affiche un flag si le mec est en ville
                    return `- ${statusSymbol} - ${grade} | <@${member.user.id}> ${flag}`;
                })
                .join('\n');

            const totalMembers = interaction.guild.memberCount;
            const totalEMS = emsMembers.size;
            const EMSService = role.members.filter(member => member.roles.cache.has('906539619540156448')).size;

            const embed = new EmbedBuilder()
                .setTitle('Liste des membres EMS')
                .setDescription(emsMemberList)
                .addFields({ name: 'EMS en service : ', value: `${EMSService}/${totalEMS}`, inline: true })
                .setColor('#29b36f')
                .setFooter({
                    text: `${flagDescription} \n${offlineDescription} \n${onlineDescription}`
                });


            await interaction.reply({ embeds: [embed], ephemeral: true});
            await console.log(`\x1b[33mEMS →\x1b[0m Commande /ems exécutée par \x1b[36m${member.nickname}\x1b[0m | Avec un total de ` + EMSService + '/' + totalEMS + ' EMS en service.');

        } catch (error) {
            console.error(error);
        }
    },
};

function getGrade(displayName) {
    const match = displayName.match(/\[(.*?)\]/);
    return match ? match[1] : '';
}

function getStatusSymbol(roles) {
    if (roles.has('906539619540156448')) {
        return '🟢'; // Si EMS en service
    } else if (roles.has('906611966800441375')) {
        return '🔴'; // Si EMS pas en service
    } else {
        return ''; // nique tes morts si t'as pas ça
    }
}