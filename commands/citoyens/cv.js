const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cv')
        .setDescription('Crée un CV pour devenir EMS'),
    async execute(interaction) {
        try {
            const member = interaction.member;

            if (member.nickname) {
                const modal = new ModalBuilder()
                    .setCustomId('cvModal')
                    .setTitle('CV EMS | Partie HRP');

                const ageHRP = new TextInputBuilder()
                    .setCustomId('ageHRP')
                    .setLabel("Quel est votre âge HRP ?")
                    .setStyle(TextInputStyle.Short);

                const persoRP = new TextInputBuilder()
                    .setCustomId('persoRP')
                    .setLabel("Est-ce votre premier perso RP sur conti ?")
                    .setStyle(TextInputStyle.Short);

                const dispos = new TextInputBuilder()
                    .setCustomId('dispos')
                    .setLabel("Quelles sont vos disponibilités par semaine ?")
                    .setStyle(TextInputStyle.Paragraph);

                const ageHRPRow = new ActionRowBuilder().addComponents(ageHRP);
                const persoRPRow = new ActionRowBuilder().addComponents(persoRP);
                const disposRow = new ActionRowBuilder().addComponents(dispos);

                modal.addComponents(ageHRPRow, persoRPRow, disposRow);

                await interaction.showModal(modal);
            } else {
                const nameCommand = interaction.client.commands.get('name');

                if (nameCommand) {
                    await nameCommand.execute(interaction);
                } else {
                    await interaction.reply("Je t'invite à faire la commande **/name** pour définir ton nom et prénom RP.");
                }
            }
        } catch (error) {
            console.error("Une erreur s'est produite :", error);
            await interaction.reply("Une erreur s'est produite. Veuillez réessayer plus tard.");
        }
    }
}
