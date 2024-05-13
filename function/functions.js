const axios = require("axios");
const {headers} = require("../config/configOptionsJson");


async function fetchPlayerNames() {
    try {
        const response = await axios.get('https://servers-frontend.fivem.net/api/servers/single/eazypm', {headers});

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

const sendRequest = async (method, route, data) => {
    let response;
    const baseRoute = process.env.CUSTOM_ENV === "production" ? "link app prod" :  "http://localhost:5000/ems/api"
    const trueRoute = baseRoute + route;
    axios.defaults.withCredentials = true;
    const headers = {
        "Authorization": `Bearer ${process.env.TOKEN}`, // Assurez-vous que BOT_TOKEN est défini dans vos variables d'environnement
    };

    const config = {
        headers: headers,
        data: data ? data : undefined,
    };

    try {
        switch (method.toLowerCase()) {
            case "get":
                response = await axios.get(trueRoute, { headers: headers });

                break;
            case "post":
                response = await axios.post(trueRoute, data, { headers: headers });
                break;
            case "put":
                response = await axios.put(trueRoute, data, { headers: headers });
                break;
            case "delete":
                // Pour une requête DELETE, axios attend la configuration en deuxième argument
                response = await axios.delete(trueRoute, config);
                break;
            case "patch":
                response = await axios.patch(trueRoute, data, { headers: headers });
                break;
            default:
                throw new Error("Invalid HTTP method");
        }

        return response;
    }
    catch (error) {
        //console.error(`Error ${method.toUpperCase()}ING data:`, error);
        throw error;
    }
};

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

module.exports = { fetchPlayerNames, extraireNomApresTiret, verifierFormatDate, sendRequest};