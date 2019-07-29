const site = require('./config'),
    axios = require('axios');

module.exports = {
    fetchMember: async function (discordid, guild = site.guildid) {

        if (!discordid) {
            return { error: "No id set", status: "fail" }
        }

        const url = `${site.discordapi}/guilds/${guild}/members/${discordid}`

        const response = await axios.get(url, { headers: site.botHeader })
            .then(async response => {
                if(response.status === 200){
                    return response.data
                } else {
                    return {error: "Not in guild", status: "fail"}
                }
            }).catch(err=> {
                console.log(err.message)
                return {error: err.message, status: "fail"}
            })
        return response;
    }, 
    fetchUser: async function (discordid) {

        if (!discordid) {
            return { error: "No id set", status: "fail" }
        }

        const url = `${site.discordapi}/users/${discordid}`

        const response = await axios.get(url, { headers: site.botHeader })
            .then(async response => {
                if(response.status === 200){
                    return response.data
                } else {
                    return {error: "Cannot find user", status: "fail"}
                }
            }).catch(err=> {
                console.log(err.message)
                return {error: err.message, status: "fail"}
            })
        return response;
    }, 
    getRoles : async function (discordid, guild = site.guildid){
        if (!discordid) {
            return { error: "No id set", status: "fail" }
        }
        const member = this.fetchMember(discordid,guild);
        let roles = [];
        if(member.user){
            roles = member.roles
        }
        return roles;
    },
    addRole : async function(discordid, guild = site.guildid, roleid){
        if (!discordid) {
            return { error: "No id set", status: "fail" }
        }
        const url = `${site.discordapi}/guilds/${guild}/members/${discordid}/roles/${roleid}`
        const response = await axios.put(url,{}, { headers: site.botHeader })
            .then(async response => {
                if(response.status === 204){
                    return {status: 200}
                } else {
                    return {error: "Not added", status: "fail"}
                }
            }).catch(err=> {
                console.log(err.message)
                return {error: err.message, status: "fail"}
            })
        return response;
    },
    removeRole : async function(discordid, guild = site.guildid, roleid){
        if (!discordid) {
            return { error: "No id set", status: "fail" }
        }
        const url = `${site.discordapi}/guilds/${guild}/members/${discordid}/roles/${roleid}`
        const response = await axios.delete(url,{ headers: site.botHeader })
            .then(async response => {
                if(response.status === 204){
                    return {status: 200}
                } else {
                    return {error: "Not added", status: "fail"}
                }
               //console.log(response)
            }).catch(err=> {
                //console.log(err)
                return {error: err.message, status: "fail"}
            })
        return response;
    },
    sendMessage : async function(channelid, message){
        if (!channelid) {
            return { error: "No id set", status: "fail" }
        }
        const url = `${site.discordapi}/channels/${channelid}/messages`
        const response = await axios.post(url, message, { headers: site.botHeader })
            .then(async response => {
                if(response.status === 200){
                    return {status: 200}
                } else {
                    return {error: "Not added", status: "fail"}
                }
            }).catch(err=> {
                return {error: err.message, status: "fail"}
            })
        return response;
    },
    avatar: async function(discordid, size = '2048', format = 'jpg'){
        if (!channelid) {
            return { error: "No id set", status: "fail" }
        }
        const user = await this.fetchUser(discordid);
        if(!user){
            return {error: "User not found", status: "fail"}
        }
        const url = `https://cdn.discordapp.com/avatars/${discordid}/${user.avatar}.${format}?size=${size}`;
        return url;

    }
}
