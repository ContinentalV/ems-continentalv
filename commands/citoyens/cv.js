const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cv')
        .setDescription('Crée un CV pour devenir EMS'),
    async execute(interaction) {
        try {
            const member = interaction.member;

            if (member.nickname) {
                await interaction.reply("Tu as déjà un pseudo défini !");
            } else {
                const nameCommand = interaction.client.commands.get('name');

                // Vérifie si la commande /name existe
                if (nameCommand) {
                    // Exécute la commande /name
                    await nameCommand.execute(interaction);
                } else {
                    await interaction.reply("La commande /name n'existe pas.");
                }
                // await interaction.reply("Je t'invite à faire la commande **/name** pour définir ton nom et prénom RP.");
            }
        } catch (error) {
            console.error("Une erreur s'est produite :", error);
            await interaction.reply("Une erreur s'est produite. Veuillez réessayer plus tard.");
        }
    }
}
