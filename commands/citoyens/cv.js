const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder} = require('discord.js');
const fs = require('fs');
const Discord = require('discord.js');
const { listChannels } = require('../../config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cv')
        .setDescription('Crée un CV pour candidater chez les EMS.')
        .addStringOption(option =>
            option.setName("prénom")
                .setDescription('Prénom RP du candidat')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("nom")
                .setDescription('Nom RP du candidat')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("agehrp")
                .setDescription('Quel est votre âge HRP ?')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("persorp")
                .setDescription('Est-ce votre premier perso RP sur conti ?')
                .setRequired(true)
                .addChoices(
                    { name: 'no', value: 'non' },
                    { name: 'yes', value: 'oui' }
                )
        )
        .addStringOption(option =>
            option.setName("dispos")
                .setDescription('Quelles sont vos disponibilités par semaine ?')
                .setRequired(true)
                .addChoices(
                    { name: '2h - 6h', value: '2-5' },
                    { name: '6h - 10h', value: '6-10' },
                    { name: '10h - 15h', value: '10-15' },
                    { name: '15h - 20h', value: '15-20' },
                    { name: '20h ou +', value: '20' }
                )
        )
        .addStringOption(option =>
            option.setName("agerp")
                .setDescription('Quel est votre âge RP ?')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("permis")
                .setDescription('Avez vous le permis de conduire ?')
                .setRequired(true)
                .addChoices(
                    { name: 'no', value: 'Non' },
                    { name: 'yes', value: 'Oui' }
                )
        )
        .addStringOption(option =>
            option.setName("dateville")
                .setDescription('Depuis quand êtes vous en ville ?')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("competences")
                .setDescription('Avez vous des compétences dans le domaine médical ? (Si oui, quoi ?)')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("metiers")
                .setDescription('Quels métiers avez vous déjà exercés ?')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("motivations")
                .setDescription('Quelles sont vos motivations à entrer chez les EMS ?')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("qualites")
                .setDescription('Donnez nous 3 qualités qui vous caractérisent')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("defauts")
                .setDescription('Donnez nous 3 défauts qui vous caractérisent')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("pourquoivous")
                .setDescription('Pourquoi nous devrions vous prendre et pas quelqu\'un d\'autre ?')
                .setRequired(true)
        ),

    async execute(interaction) {
        const { member, guild, client, user, options} = interaction;

        const resultats = {
            "prenom": options.getString('prénom'),
            "nom": options.getString('nom'),
            "agehrp": options.getString('agehrp'),
            "persorp": options.getString('persorp'),
            "dispos": options.getString('dispos'),
            "agerp": options.getString('agerp'),
            "permis": options.getString('permis'),
            "dateville": options.getString('dateville'),
            "competences": options.getString('competences'),
            "metiers": options.getString('metiers'),
            "motivations": options.getString('motivations'),
            "qualites": options.getString('qualites'),
            "defauts": options.getString('defauts'),
            "pourquoivous": options.getString('pourquoivous')
        };

        const embed = new EmbedBuilder()
            .setTitle("Informations de l'utilisateur")
            .setColor('#0099ff')
            .addFields(
                { name: '--- Partie HRP ---', value: '\u200B' },
                { name: 'Prénom', value: resultats.prenom, inline: true },
                { name: 'Nom', value: resultats.nom, inline: true },
                { name: 'Âge HRP', value: resultats.agehrp, inline: true },
                { name: 'Premier perso RP sur conti', value: resultats.persorp, inline: true },
                { name: 'Disponibilités par semaine', value: resultats.dispos, inline: true },
                { name: '--- Partie RP ---', value: '\u200B' },
                { name: 'Âge RP', value: resultats.agerp, inline: true },
                { name: 'Permis de conduire', value: resultats.permis, inline: true },
                { name: 'Date d\'arrivée en ville', value: resultats.dateville, inline: true },
                { name: 'Compétences médicales', value: resultats.competences, inline: true },
                { name: 'Métiers exercés', value: resultats.metiers, inline: true },
                { name: 'Motivations pour les EMS', value: resultats.motivations, inline: true },
                { name: 'Qualités', value: resultats.qualites, inline: true },
                { name: 'Défauts', value: resultats.defauts, inline: true },
                { name: 'Pourquoi vous ?', value: resultats.pourquoivous, inline: true }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: true });

        // await interaction.reply({ content: `Votre CV a bien été envoyé !
        // ${resultats.prenom} ${resultats.nom} a ${resultats.agehrp} ans HRP et ${resultats.agerp} ans RP.
        // `, ephemeral: true });
    },
};