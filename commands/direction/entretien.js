const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder} = require('discord.js');
const fs = require('fs');
const Discord = require('discord.js');
const { registerFont } = require('canvas');
const { createCanvas } = require('@napi-rs/canvas');
const { listChannels } = require('../../config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('entretien')
        .setDescription('Crée une fiche entretien d\'un candidat.')
        .addStringOption(option =>
            option.setName("prénom")
                .setDescription('Prénom du candidat')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("nom")
                .setDescription('Nom du candidat')
                .setRequired(true)
        )
        .addUserOption(option =>
            option.setName("candidat")
                .setDescription('Mentionner le candidat')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("noteperso")
                .setDescription('Note personnelle du RH')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("ponctualité")
                .setDescription('La personne a t-elle été ponctuelle ?')
                .setRequired(true)
                .addChoices(
                    { name: '0pt', value: '0' },
                    { name: '1pt', value: '1' },
                )
        )
        .addStringOption(option =>
            option.setName("tenue_professionnelle")
                .setDescription('La personne a t-elle une tenue professionnelle ?')
                .setRequired(true)
                .addChoices(
                    { name: '0pt', value: '0' },
                    { name: '1pt', value: '1' },
                )
        )
        .addStringOption(option =>
            option.setName("attitude")
                .setDescription('Quelle a été l\'attitude de la personne ?')
                .setRequired(true)
                .addChoices(
                    { name: '0pt', value: '0' },
                    { name: '1pt', value: '1' },
                    { name: '2pts', value: '2' },
                )
        )
        .addStringOption(option =>
            option.setName("presentation")
                .setDescription('La personne s\'est-elle bien présentée ?')
                .setRequired(true)
                .addChoices(
                    { name: '0pt', value: '0' },
                    { name: '1pt', value: '1' },
                )
        )
        .addStringOption(option =>
            option.setName("age")
                .setDescription('La personne a t-elle un âge supérieur à 16 ans ?')
                .setRequired(true)
                .addChoices(
                    { name: '0pt', value: '0' },
                    { name: '1pt', value: '1' },
                )
        )
        .addStringOption(option =>
            option.setName("communication")
                .setDescription('La personne a t-elle une bonne communication ?')
                .setRequired(true)
                .addChoices(
                    { name: '0pt', value: '0' },
                    { name: '1pt', value: '1' },
                    { name: '2pts', value: '2' },
                )
        )
        .addStringOption(option =>
            option.setName("disponibilités")
                .setDescription('La personne est-elle bcp disponible ?')
                .setRequired(true)
                .addChoices(
                    { name: '0pt', value: '0' },
                    { name: '1pt', value: '1' },
                )
        )
        .addStringOption(option =>
            option.setName("etudes_experiences_pro")
                .setDescription('La personne a t-elle des études ou expériences professionnelles (EMS ou pas) ?')
                .setRequired(true)
                .addChoices(
                    { name: '0pt', value: '0' },
                    { name: '1pt', value: '1' },
                    { name: '2pts', value: '2' },
                )
        )
        .addStringOption(option =>
            option.setName("qualites_citoyen")
                .setDescription('La personne a t-elle donné 3 qualités qu\'elle a ?')
                .setRequired(true)
                .addChoices(
                    { name: '0pt', value: '0' },
                    { name: '1pt', value: '1' },
                    { name: '2pts', value: '2' },
                    { name: '3pts', value: '3' },
                )
        )
        .addStringOption(option =>
            option.setName("defauts_citoyen")
                .setDescription('La personne a t-elle donné 3 défauts qu\'elle a ?')
                .setRequired(true)
                .addChoices(
                    { name: '0pt', value: '0' },
                    { name: '1pt', value: '1' },
                    { name: '2pts', value: '2' },
                    { name: '3pts', value: '3' },
                )
        )
        .addStringOption(option =>
            option.setName("adjectifs")
                .setDescription('La personne a t-elle donné 3 adjectifs pour décrire un bon EMS ?')
                .setRequired(true)
                .addChoices(
                    { name: '0pt', value: '0' },
                    { name: '1pt', value: '1' },
                    { name: '2pts', value: '2' },
                    { name: '3pts', value: '3' },
                )
        )
        .addStringOption(option =>
            option.setName("survie")
                .setDescription('La personne a t-elle répondu de manière cohérente au test de survie ?')
                .setRequired(true)
                .addChoices(
                    { name: '0pt', value: '0' },
                    { name: '1pt', value: '1' },
                    { name: '2pt', value: '2' },
                )
        )
        .addStringOption(option =>
            option.setName("physique")
                .setDescription('La personne a t-elle réussi le test physique ?')
                .setRequired(true)
                .addChoices(
                    { name: '0pt', value: '0' },
                    { name: '1pt', value: '1' },
                    { name: '2pt', value: '2' },
                    { name: '3pt', value: '3' },
                )
        )
        .addStringOption(option =>
            option.setName("conduite")
                .setDescription('La personne conduit-elle bien ?')
                .setRequired(true)
                .addChoices(
                    { name: '0pt', value: '0' },
                    { name: '1pt', value: '1' },
                    { name: '2pt', value: '2' },
                    { name: '3pt', value: '3' },
                    { name: '4pt', value: '4' },
                    { name: '5pt', value: '5' },
                )
        ),

    async execute(interaction) {
        const { member, guild, client, user, options} = interaction;
        const TOTAL = parseInt(interaction.options.getString('ponctualité')) + parseInt(interaction.options.getString('tenue_professionnelle')) + parseInt(interaction.options.getString('attitude')) + parseInt(interaction.options.getString('presentation')) + parseInt(interaction.options.getString('age')) + parseInt(interaction.options.getString('communication')) + parseInt(interaction.options.getString('disponibilités')) + parseInt(interaction.options.getString('etudes_experiences_pro')) + parseInt(interaction.options.getString('qualites_citoyen')) + parseInt(interaction.options.getString('defauts_citoyen')) + parseInt(interaction.options.getString('adjectifs')) + parseInt(interaction.options.getString('survie')) + parseInt(interaction.options.getString('physique')) + parseInt(interaction.options.getString('conduite'))+ "/30";

        const candidat = options.getUser('candidat');
        const rh = member;
        const noteperso = options.getString('noteperso');

        const resultats = {
            "prenom": options.getString('prénom'),
            "nom": options.getString('nom'),
            "Ponctualité": options.getString('ponctualité'),
            "Tenue professionnelle": options.getString('tenue_professionnelle'),
            "Attitude": options.getString('attitude'),
            "Présentation": options.getString('presentation'),
            "Âge": options.getString('age'),
            "Communication": options.getString('communication'),
            "Disponibilités": options.getString('disponibilités'),
            "Études & expériences pro": options.getString('etudes_experiences_pro'),
            "3 Qualités": options.getString('qualites_citoyen'),
            "3 Défauts": options.getString('defauts_citoyen'),
            "3 adj bon EMS": options.getString('adjectifs'),
            "Test survie": options.getString('survie'),
            "Test physique": options.getString('physique'),
            "Test conduite": options.getString('conduite'),
            "TOTAL": TOTAL
        };

        const lengthResult = Object.keys(resultats).length - 1;

        const canvas = createCanvas(600, 700);
        const ctx = canvas.getContext('2d');

        const navy = "#001233";
        const white = "#f8f7ff";
        const lightblue = "#caf0f8";
        const black = "#012a4a";
        const font = "17px 'Arial', sans-serif";
        const boldFont = "bold 17px 'Poppins', sans-serif";

        const tableWidth = 600;
        const tableHeight = 700;
        const cellWidth = tableWidth / 2;
        const cellHeight = tableHeight / lengthResult;
        const marginX = (canvas.width - tableWidth) / 2;
        const marginY = (canvas.height - tableHeight) / 2;

        ctx.strokeStyle = black;
        ctx.lineWidth = 1;
        ctx.strokeRect(marginX, marginY, tableWidth, tableHeight);

        let i = -2;

        for (const resultat in resultats) {
            let critere = resultat;
            let points = resultats[resultat];
            i+=1;

            ctx.beginPath();
            ctx.moveTo(marginX, marginY + i * cellHeight);
            ctx.lineTo(marginX + tableWidth, marginY + i * cellHeight);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(marginX + cellWidth, marginY);
            ctx.lineTo(marginX + cellWidth, marginY + tableHeight);
            ctx.stroke();

            ctx.fillStyle = white;

            ctx.fillRect(marginX + 1, marginY + i * cellHeight + 1, cellWidth - 1, cellHeight - 1);
            ctx.fillRect(marginX + cellWidth + 1, marginY + i * cellHeight + 1, cellWidth - 1, cellHeight - 1);

            ctx.fillStyle = black;
            ctx.font = font;
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            if (i === 0 || i === lengthResult - 1) {
                ctx.font = boldFont;
            }

            if (i === 0) {
                ctx.fillStyle = lightblue;
                ctx.fillRect(marginX + 1, marginY + 1, cellWidth - 1, cellHeight - 1);
                ctx.fillRect(marginX + cellWidth + 1, marginY + 1, cellWidth - 1, cellHeight - 1);
                ctx.fillStyle = navy;
                ctx.fillText("CRITERES", marginX + 65, marginY + cellHeight / 2);
                ctx.fillText("POINTS", marginX + cellWidth + 80, marginY + cellHeight / 2);
            } else {
                ctx.fillText(critere, marginX + 10, marginY + i * cellHeight + cellHeight / 2);
                ctx.textAlign = "center";
                ctx.fillText(`${points}`, marginX + cellWidth + cellWidth / 2, marginY + i * cellHeight + cellHeight / 2);
            }
        }

        let nomSansEspace = resultats.nom.replace(/ /g, "_");
        let prenomSansEspace = resultats.prenom.replace(/ /g, "_");

        // CR_ENTRETIEN-297036747513135104-16022024-Jean-Baptiste.png
        const name = "CR_ENTRETIEN-" + interaction.user.id + "-" + Date.now() + "-" + prenomSansEspace + "-" + nomSansEspace + ".png";

        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: name });

        fs.writeFile(`media/cr/${name}`, await canvas.encode('png'), (err) => {
            if (err) throw err;
            console.log(`\x1b[33mENTRETIEN →\x1b[0m Un entretien a été réalisé par \x1b[36m${rh.nickname ? rh.nickname : rh.user.username}\x1b[0m ! --> \x1b[34m${resultats.prenom + " " + resultats.nom}\x1b[0m`);
            console.log(`\x1b[33mENTRETIEN →\x1b[0m Les notes du candidat ont été sauvegardées ! --> ${name}`);
        });
        const imagePath = `media/cr/${name}`;

        // console.log(rh)

        const embed = new EmbedBuilder()
            .setColor("#29b36f")
            .setAuthor({name: `Entretien réalisé par ${rh.nickname ? rh.nickname : rh.user.username}`, iconURL: rh.user.displayAvatarURL()})
            .setTitle(`Fiche d'entretien de ${resultats.prenom} ${resultats.nom}`)
            .setDescription(`
            **Candidat :** ${candidat} \n
            **Recruteur :** ${rh} \n 
            `)
            .addFields({ name: 'Note personnelle du recruteur : ', value: `\`\`\`${noteperso}\`\`\` \n`, inline: false },
                { name: 'NOTE FINALE : ', value: `
\`\`\`fix
${TOTAL}
\`\`\`
`, inline: true })
            .setImage(`attachment://${name}`)
            .setFooter({text: `${rh.nickname ? rh.nickname : rh.user.username}`, iconURL: rh.user.displayAvatarURL()})
            .setTimestamp();

        const entretiensChannel = listChannels.entretiens;
        const channel = client.channels.cache.get(entretiensChannel);
        if (channel) {
            const sentMessage = await channel.send({ embeds: [embed], files: [{
                    attachment: imagePath,
                    name: name
                }]});

            const messageLink = `https://discord.com/channels/${sentMessage.guild.id}/${channel.id}/${sentMessage.id}`;
            await interaction.reply({
                content: `Vous venez de réaliser un entretien d'embauche ! La haute direction décidera bientôt du sort du candidat.\n[🔗 **Compte rendu de l\'entretien**](${messageLink})`,
                ephemeral: true
            });
        } else {
            console.error(`Impossible de trouver le canal avec l'ID ${entretiensChannel}`);
            await interaction.reply({
                content: `ERROR : Impossible de trouver le canal avec l'ID ${entretiensChannel}`,
                ephemeral: true
            });
        }


    },
};