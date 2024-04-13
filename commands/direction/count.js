const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('count')
        .setDescription('Affiche le nombre de messages écrits par personne'),

    async execute(interaction) {
        const channel = interaction.channel;
        const limit = 100; // Nombre de messages à récupérer à chaque appel

        let messages = [];
        let lastMessageId = null;

        // Récupérer tous les messages du canal
        do {
            const options = { limit: limit };
            if (lastMessageId) {
                options.before = lastMessageId;
            }
            const fetchedMessages = await channel.messages.fetch(options);
            const fetchedCount = fetchedMessages.size;

            if (fetchedCount === 0) {
                break;
            }

            messages = messages.concat(Array.from(fetchedMessages.values()));
            lastMessageId = fetchedMessages.last().id;
        } while (messages.length < 1000); // Changer la limite selon vos besoins

        const messageCount = new Map();
        const mentionCount = new Map();

        // Compter le nombre de messages et de mentions par utilisateur
        messages.forEach((message) => {
            const userId = message.author.id;
            messageCount.set(userId, (messageCount.get(userId) || 0) + 1);
            const mentions = message.mentions.users;
            mentions.forEach((user) => {
                const mentionedUserId = user.id;
                mentionCount.set(mentionedUserId, (mentionCount.get(mentionedUserId) || 0) + 1);
            });
        });

        const users = Array.from(messageCount.keys());

        const embeds = [];
        const pageSize = 25;

        for (let i = 0; i < users.length; i += pageSize) {
            const embed = new EmbedBuilder()
                .setTitle('Statistiques des messages')
                .setDescription('Nombre de messages et de mentions par personne :');

            const pageUsers = users.slice(i, i + pageSize);

            pageUsers.forEach((userId) => {
                const user = interaction.guild.members.cache.get(userId);
                const username = user ? user.displayName : userId;
                const count = messageCount.get(userId) || 0;
                const mentionCountForUser = mentionCount.get(userId) || 0;
                embed.addFields(
                    { name: `${username}`, value: `Messages : ${count}\nMentions : ${mentionCountForUser}\n> \`TOTAL : ${count + mentionCountForUser}\``, inline: false }
                );
            });

            embeds.push(embed);
        }

        await interaction.reply({ embeds: embeds, ephemeral: true });
    },
};