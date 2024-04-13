const {Events, AttachmentBuilder, EmbedBuilder} = require('discord.js');
const {discordMembers, listChannels, roles} = require('../config');
const {channels} = require("../main");

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.content.includes("quoicou")) {
            const member = message.member;
            const channelIdDirection = listChannels.exclusions;
            const channeloo = channels.cache.get(channelIdDirection);

            // EMBED ADMIN
            const embedAdmin = new EmbedBuilder()
                .setColor('#c1121f')
                .setTitle(':warning: Un quoicou a été détecté !')
                .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL() })
                .addFields({ name: 'Le message en question :', value: '```diff\n ' + message.content + '\n```', inline: true })
                .addFields({name:'\u200b', value: `\n \n${message.url}\n \n`, inline: false })
            if (message.member && message.member._roles.includes('838120186585940010')) {
                embedAdmin.addFields({ name: '\u200b', value: `\n \nLe GOAT <@${message.author.id}> a tous les droits ;) Donc pas de sanction.\n \n`, inline: false });
            } else {
                embedAdmin.addFields({ name: '\u200b', value: `\n \n<@${message.author.id}> a été exclu 40 secondes.\n \n`, inline: false });
            }
            embedAdmin.setFooter({ text: 'Message détécté', iconURL: 'https://assets-v2.lottiefiles.com/a/b5641ed8-1152-11ee-ada0-8f4e8e17569e/BYD1hNXDDt.gif' })
                .setTimestamp()


            // EMBED CLIENT
            const embedClient = new EmbedBuilder()
                .setColor('#c1121f')
                .setTitle(':warning: Je vous rappelle qu\'écrire "quoicou" dans un message est interdit.')
                .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL() })
                .addFields({ name: 'Le message en question :', value: '```diff\n "' + message.content + '"\n```', inline: true })
                .addFields({name:'\u200b', value: `\n \n<@${message.author.id}> a été exclu 40 secondes.\n \n`, inline: false })
                .setFooter({ text: 'Message détécté'})
                .setTimestamp();


            if (message.member && message.member._roles.includes(roles.DirectionRole)) {
                message.reply({ content: `Le GOAT <@${message.author.id}> a tous les droits, donc pas de sanction. 🖕🏻 les autres.`}).then((sentMessage) => {
                    setTimeout(() => sentMessage.delete(), 10000);
                    setTimeout(() => message.delete(), 10000);
                });
                return;
            }
            else {
                channeloo.send({ embeds: [embedAdmin] });
                message.reply({ embeds: [embedClient] }).then((sentMessage) => {
                    // Suppression du message embed après 20 secondes
                    setTimeout(() => sentMessage.delete(), 10000);
                    // Suppression du message de l'utilisateur après 20 secondes
                    setTimeout(() => message.delete(), 10000);
                });
            }

            // EXPULSION PENDANT 40S
            member.timeout(40_000);

        }

    }

}



