const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Supprime les derniers messages')
        .addIntegerOption(option =>
            option.setName('nombre')
                .setDescription('Le nombre de messages à supprimer')
                .setRequired(true)
        ),
    async execute(interaction) {
        const nbMessages = interaction.options.getInteger('nombre');

        const roleId = '838120186585940010'; // ID de la direction
        const hasRequiredRole = interaction.member.roles.cache.has(roleId);

        if (!hasRequiredRole) {
            return interaction.reply({ content: 'Dégage de la ! T\'es de la direction peut être pour faire cette commande ?? Je crois pas nan.', ephemeral: true });
        }

        if (nbMessages < 1 || nbMessages > 100) {
            return interaction.reply('Le nombre de messages doit être compris entre 1 et 100.');
        }

        try {
            const messages = await interaction.channel.messages.fetch({ limit: nbMessages });
            await interaction.channel.bulkDelete(messages);
            await console.log(`\x1b[33mPURGE →\x1b[0m \x1b[36m${interaction.member.nickname}\x1b[0m a supprimé ${nbMessages} messages dans ${interaction.channel.name}.`);
            return interaction.reply({ content: `Vous avez supprimé ${nbMessages} messages.`, ephemeral: true });
        } catch (error) {
            console.error(error);
            return interaction.reply('Une erreur s\'est produite lors de la suppression des messages.');
        }
    },
};
