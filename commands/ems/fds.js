const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { roles } = require('../../config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fds')
        .setDescription('Fin de service'),
    async execute(interaction) {
        const member = interaction.member;
        const roleId = roles.EmergencyRole;
        const hasRole = member.roles.cache.has(roleId);

        // TODO : Vérifier si l'utilisateur est bien en service
        if (!hasRole) {
            await interaction.reply("Tu n'es pas EMS, tu ne peux pas prendre ta fin de service !");
            return;
        }

        // TODO : Calculer heures de service et enregistrer en BDD la date et l'heure de la fin de service

        let timestampPDS = "1712761200000";
        let timestampFDS = Date.now();
        const dateFDS = new Date(timestampFDS);

        const jourFDS = ("0" + dateFDS.getDate()).slice(-2);
        const moisFDS = ("0" + (dateFDS.getMonth() + 1)).slice(-2);
        const anneeFDS = dateFDS.getFullYear();
        const heuresFDS = ("0" + dateFDS.getHours()).slice(-2);
        const minutesFDS = ("0" + dateFDS.getMinutes()).slice(-2);
        const secondesFDS = ("0" + dateFDS.getSeconds()).slice(-2);

        const texteFDS = `${jourFDS}-${moisFDS}-${anneeFDS} - ${heuresFDS}:${minutesFDS}:${secondesFDS}`;

        let dureeServiceMillis  = timestampFDS - timestampPDS;
        const heuresService = Math.floor(dureeServiceMillis / (1000 * 60 * 60));
        const minutesService = Math.floor((dureeServiceMillis % (1000 * 60 * 60)) / (1000 * 60));
        let nombreReas = 56;

        // TOTAL
        let totalHeures = 26;
        let totalReas = 166;

        const embed = new EmbedBuilder()
            .setTitle("Fin de service")
            // .setDescription('```ml\n' +
            //     'PDS: 10-04-2024 - 17:00:00\n' +
            //     `FDS: ${texteFDS}` +
            //     '\n\n' +
            //     `DUREE SERVICE : ${heuresService} h ${minutesService}\nDUREE SERVICE TOTALE : 47 h 21\n` +
            //     `NOMBRE REAS : ${nombreReas}\n` +
            //     '\n' +
            //     '    ESTIMATION SALAIRE\n' +
            //     '     ┌───────────────┐\n' +
            //     '        2 520 000 $US\n' +
            //     '     └───────────────┘\n' +
            //     '```')
            .setDescription('```ml\n' +
                'PDS: 10-04-2024 - 17:00:00\n' +
                `FDS: ${texteFDS}` + '```')
            .addFields({ name: "Durée service", value: "```"+heuresService+"h"+minutesService+"```", inline: true },
                { name: "Nombre réas", value: "```"+nombreReas+"```", inline: true},
                { name: "═══════════════════════════", value:"══════ TOTAL HEBDOMADAIRE ══════", inline: false},
                { name: "TOTAL HEURES", value: "```"+totalHeures+"```", inline: true},
                { name: "TOTAL REAS", value: "```"+totalReas+"```", inline: true},
                { name: "SALAIRE ESTIMÉ", value: "```2 520 000 $US```", inline: false})
            .setFooter({text: `${member.nickname}`, iconURL: member.user.displayAvatarURL()})
            .setColor('#2dce22')
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: true});
    }
};
