const {Events, AttachmentBuilder} = require('discord.js');
const {createCanvas, Image} = require('@napi-rs/canvas');
const {sendRequest} = require("../function/functions");


module.exports = {
    name: 'guildMemberAdd',

    async execute(member) {

        const body = {
            id_discord: member.id,
            username: member.user.username,
            nickname: null,
            avatar_url: member.user.avatarURL(),
        }
        console.log(member.id)
        try {
            const response = await sendRequest('post', '/users/create', body)
            if (response.status === 201) {
                console.log(response.data)
            }else {
                console.log("une erreur est survenue")
            }
        }catch (e) {
            console.log(e.message)
        }
    },
}
