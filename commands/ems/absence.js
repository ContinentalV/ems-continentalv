const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder} = require('discord.js');
const {roles} = require("../../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('absence')
        .setDescription('Poser une absence'),
    async execute(interaction) {
        const member = interaction.member;
        const roleId = roles.EmergencyRole;
        const hasRole = member.roles.cache.has(roleId);
        if (!hasRole) {
            await interaction.reply("Tu n'es pas EMS, tu ne peux pas poser d'absence !");
            return;
        }

        try {
            const modal = new ModalBuilder()
                .setCustomId('absenceModal')
                .setTitle('POSER UNE ABSENCE | EMS');

            const dateDebut = new TextInputBuilder()
                .setCustomId('dateDebut')
                .setLabel("Quand commence votre absence ? (JJ/MM/AAAA)")
                .setStyle(TextInputStyle.Short);

            const dateFin = new TextInputBuilder()
                .setCustomId('dateFin')
                .setLabel("Quand se termine votre absence ? (JJ/MM/AAAA)")
                .setStyle(TextInputStyle.Short);

            const raison = new TextInputBuilder()
                .setCustomId('raison')
                .setLabel("Quelle est la raison HRP de votre absence ?")
                .setStyle(TextInputStyle.Paragraph);

            const dateDebutRow = new ActionRowBuilder().addComponents(dateDebut);
            const dateFinRow = new ActionRowBuilder().addComponents(dateFin);
            const raisonRow = new ActionRowBuilder().addComponents(raison);

            modal.addComponents(dateDebutRow, dateFinRow, raisonRow);

            await interaction.showModal(modal);
        } catch (error) {
            console.error("Une erreur s'est produite :", error);
            await interaction.reply("Une erreur s'est produite. Veuillez réessayer plus tard.");
        }
    }
}
