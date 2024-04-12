const {get} = require("axios");
const {headers} = require("../config/configOptionsJson");


async function fetchPlayerNames() {
    try {
        const response = await get('https://servers-frontend.fivem.net/api/servers/single/eazypm', {headers});

        const players = response.data.Data.players;
        const clients = response.data.Data.clients;
        const namesAndIds = players.map(player => {
            const idIG = player.id;
            const identifiers = player.identifiers;
            const discordIdentifier = identifiers.find(id => id.startsWith('discord:'));
            const name = player.name;
            const id = discordIdentifier ? discordIdentifier.split(':')[1] : null;
            return { name, id, idIG, identifiers };
        });

        return namesAndIds;
    } catch (error) {
        console.error(error);
    }
}

function extraireNomApresTiret(nickname) {
    const regex = /\[.*?\] - (.*)/;
    const match = regex.exec(nickname);
    if (match && match.length > 1) {
        return match[1];
    } else {
        return null;
    }
}
function verifierFormatDate(date) {
    const regexDate = /^\d{2}\/\d{2}\/\d{4}$/;
    return regexDate.test(date);
}

module.exports = { fetchPlayerNames, extraireNomApresTiret, verifierFormatDate};