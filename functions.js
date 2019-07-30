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
                if (response.status === 200) {
                    return response.data
                } else {
                    return { error: "Not in guild", status: "fail" }
                }
            }).catch(err => {
                console.log(err.message)
                return { error: err.message, status: "fail" }
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
                if (response.status === 200) {
                    return response.data
                } else {
                    return { error: "Cannot find user", status: "fail" }
                }
            }).catch(err => {
                console.log(err.message)
                return { error: err.message, status: "fail" }
            })
        return response;
    },
    getRoles: async function (discordid, guild = site.guildid) {
        if (!discordid) {
            return { error: "No id set", status: "fail" }
        }
        const member = this.fetchMember(discordid, guild);
        let roles = [];
        if (member.user) {
            roles = member.roles
        }
        return roles;
    },
    addRole: async function (discordid, guild = site.guildid, roleid) {
        if (!discordid) {
            return { error: "No id set", status: "fail" }
        }
        const url = `${site.discordapi}/guilds/${guild}/members/${discordid}/roles/${roleid}`
        const response = await axios.put(url, {}, { headers: site.botHeader })
            .then(async response => {
                if (response.status === 204) {
                    return { status: 200 }
                } else {
                    return { error: "Not added", status: "fail" }
                }
            }).catch(err => {
                console.log(err.message)
                return { error: err.message, status: "fail" }
            })
        return response;
    },
    removeRole: async function (discordid, guild = site.guildid, roleid) {
        if (!discordid) {
            return { error: "No id set", status: "fail" }
        }
        const url = `${site.discordapi}/guilds/${guild}/members/${discordid}/roles/${roleid}`
        const response = await axios.delete(url, { headers: site.botHeader })
            .then(async response => {
                if (response.status === 204) {
                    return { status: 200 }
                } else {
                    return { error: "Not added", status: "fail" }
                }
                //console.log(response)
            }).catch(err => {
                //console.log(err)
                return { error: err.message, status: "fail" }
            })
        return response;
    },
    removeRoles: async function (discordid, guild = site.guildid, roles) {
        if (!discordid) {
            return { error: "No id set", status: "fail" }
        }

         let i = 0, howManyTimes = roles.length;
        async function f() {
            //logic here
            const url = `${site.discordapi}/guilds/${guild}/members/${discordid}/roles/${roles[i]}`;
            await axios.delete(url, { headers: site.botHeader })
                .then(async response => {
                    console.log(response.status)
                    if (response.status === 204) {

                        return { status: 200 }
                    } else {
                        return { error: "Not added", status: "fail" }
                    }

                }).catch(err => {
                    //console.log(err)
                    return { error: err.message, status: "fail" }
                })

            i++;
            if (i < howManyTimes) {
                setTimeout(f, 7000);
            }
        }
        if (roles.length > 0) {
            f();
        }
        return;
    },
    sendMessage: async function (channelid, message) {
        if (!channelid) {
            return { error: "No id set", status: "fail" }
        }
        message = JSON.stringify(message);
        const url = `${site.discordapi}/channels/${channelid}/messages`
        const response = await axios.post(url, message, { headers: site.botHeader })
            .then(async response => {
                if (response.status === 200) {
                    return { status: 200 }
                } else {
                    return { error: "Not added", status: "fail" }
                }
            }).catch(err => {
                throw Error({ error: err.message, status: "fail" });
            })
        return response;
    },
    sendDm: async function (discordid, message) {
        if (!discordid) {
            return { error: "No target set", status: "fail" }
        }
        //message = JSON.stringify(message);
        //
        const dmurl = `${site.discordapi}/users/@me/channels`
        const dmresponse = await axios.post(dmurl, { "recipient_id": discordid }, { headers: site.botHeader })
            .then(async response => {
                if (response.status === 200) {
                    return { status: 200, data: response.data }
                } else {
                    return { error: "Not added", status: "fail" }
                }
            }).catch(err => {
                return { error: err, status: "fail" }
            })

        console.log(dmresponse)

        if (dmresponse.error) {
            throw Error(dmresponse.error)
        }

        const response = await this.sendMessage(dmresponse.data.id, message)

        return response;
    },
    avatar: async function (discordid, size = '2048', format = 'jpg') {
        if (!channelid) {
            return { error: "No id set", status: "fail" }
        }
        const user = await this.fetchUser(discordid);
        if (!user) {
            return { error: "User not found", status: "fail" }
        }
        const url = `https://cdn.discordapp.com/avatars/${discordid}/${user.avatar}.${format}?size=${size}`;
        return url;

    }
}
