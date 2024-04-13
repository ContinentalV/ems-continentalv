const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('check')
        .setDescription('Ajoute un check aux derniers messages')
        .addIntegerOption(option =>
            option.setName('nombre')
                .setDescription('Le nombre de messages à vérifier')
                .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.channel;
        const numberOfMessages = interaction.options.getInteger('nombre');

        // Récupérer les derniers messages
        const messages = await channel.messages.fetch({ limit: numberOfMessages });

        // Ajouter l'emoji à chaque message
        messages.forEach(async message => {
            await message.react('<:oui:1120726089703116900>');
        });

        await console.log(`\x1b[33mCHECK →\x1b[0m \x1b[36m${interaction.member.nickname}\x1b[0m a checké ${numberOfMessages} messages dans ${interaction.channel.name}.`);
        await interaction.reply({content: `Emoji ajouté aux ${numberOfMessages} derniers messages.`, ephemeral:true});
    },
};
