const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder} = require('discord.js');
const fs = require('fs');
const Discord = require('discord.js');
const { registerFont } = require('canvas');
const { createCanvas } = require('@napi-rs/canvas');
const { listChannels } = require('../../config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('patient')
        .setDescription('Ajoute un dossier patient')
        .addStringOption(option =>
            option.setName("prénom")
                .setDescription('Prénom du patient')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("nom")
                .setDescription('Nom du patient')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("causes")
                .setDescription('Quelles sont les causes du coma ?')
                .setRequired(true)
                .addChoices(
                    { name: 'Mort de faim/soif', value: 'Mort de faim/soif' },
                    { name: 'Mort par balle', value: 'Mort par balle' },
                    { name: 'Babayaga', value: 'Babayaga' },
                    { name: 'Choc violent', value: 'Choc violent' },
                    { name: 'Accident de voiture', value: 'Accident de voiture' },
                    { name: 'Chute grave', value: 'Chute grave' },
                    { name: 'Crash avion/hélico', value: 'Crash avion/hélico' },
                    { name: 'Noyade', value: 'Noyade' },
                    { name: 'Virus / Freekill', value: 'Virus / Freekill' },
                )
        )
        .addStringOption(option =>
            option.setName("chirurgie")
                .setDescription('Il y a-t-il eu une chirurgie ?')
                .setRequired(true)
                .addChoices(
                    { name: 'Oui, j\'ai fait une chirurgie', value: 'oui' },
                    { name: 'Non je n\'en n\'ai pas faite', value: 'non' },
                )
        )
        .addAttachmentOption(option =>
            option.setName('image')
                .setDescription('Ajouter une image en pièce jointe')
                .setRequired(true)
        )
        .addUserOption(option =>
            option.setName("collegue")
                .setDescription('Mention du collègue qui a fait la réanimation avec vous')
                .setRequired(false)
        ),
    async execute(interaction) {
        const prénom = interaction.options.getString('prénom');
        const nom = interaction.options.getString('nom');
        const causes = interaction.options.getString('causes');
        const chirurgie = interaction.options.getString('chirurgie');

        // TODO : Enregistrer en base de données les informations du patient

        const embed = new EmbedBuilder()
            .setTitle('Dossier patient')
            .setDescription(`Dossier du patient **${prénom} ${nom}**`)
            .setColor('#2dce22')
            .addFields(
                { name: 'Prénom', value: "```"+prénom+"```", inline: true },
                { name: 'Nom', value: "```"+nom+"```", inline: true },
                { name: 'Chirurgie faite ?', value: "```"+chirurgie+"```", inline: true },
                { name: 'Causes du coma', value: "```"+causes+"```", inline: true }
            );

        if (interaction.options.getAttachment('image')) {
            const attachment = interaction.options.getAttachment('image');
            embed.setImage(attachment.url);
        }
        if (interaction.options.getUser('collegue')) {
            const collegue = interaction.options.getUser('collegue');
            embed.addFields(
                { name: 'Collègue', value: "<@"+collegue.id+">", inline: false }
            );
        }
            embed.setFooter({text: `Dossier par ${interaction.member.nickname}`, iconURL: interaction.user.displayAvatarURL()})
                 .setTimestamp();

        const crPatient = listChannels.cr_patient;
        const channel = interaction.client.channels.cache.get(crPatient);
        if (channel) {
            const sentMessage = await channel.send({ embeds: [embed] });

            const messageLink = `https://discord.com/channels/${sentMessage.guild.id}/${channel.id}/${sentMessage.id}`;
            await interaction.reply({
                content: `Vous avez réanimé ${prénom} ${nom}.\n[🔗 **Compte rendu de la réa**](${messageLink})`,
                ephemeral: true
            });
            setTimeout(async () => {
                await interaction.deleteReply();
            }, 7000);
        } else {
            console.error(`Impossible de trouver le canal avec l'ID ${channel}`);
            await interaction.reply({
                content: `ERROR : Impossible de trouver le canal avec l'ID ${channel}`,
                ephemeral: true
            });
        }
    }
}