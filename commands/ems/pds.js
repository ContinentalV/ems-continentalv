const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { roles } = require('../../config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pds')
        .setDescription('Prise de service'),
    async execute(interaction) {
        const member = interaction.member;
        const roleId = roles.EmergencyRole;
        const hasRole = member.roles.cache.has(roleId);

        // TODO : Vérifier que l'utilisateur n'est pas en service
        // TODO : Vérifier que l'utilisateur n'a pas une absence en cours
        if (!hasRole) {
            await interaction.reply("Tu n'es pas EMS, tu ne peux pas prendre ton service !");
            return;
        }

        // TODO : Enregstrer en BDD la date et l'heure de la prise de service

        const embed = new EmbedBuilder()
            .setTitle("Prise de service")
            .addFields({ name: "Date", value: "```"+new Date().toLocaleDateString()+"```", inline: true },
                { name: "Heure", value: "```"+new Date().toLocaleTimeString()+"```", inline: true})
            .setFooter({text: `${member.nickname}`, iconURL: member.user.displayAvatarURL()})
            .setColor('#2dce22')
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: true});
    }
};
