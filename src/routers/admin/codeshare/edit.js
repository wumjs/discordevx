const app = require('express').Router();
const codesSchema = require("../../../database/models/codes.js");
const client = global.Client;
const channels = global.config.server.channels,
	  roles = global.config.server.roles;
const Discord = require("discord.js");

console.log("[disbots.xyz]: Admin/CodeShare/Edit router loaded.");

app.post("/admin/editcode/:code", global.checkAuth, async (req, res) => {
    const rBody = req.body;
    let kod = req.params.code;
    await codesSchema.findOneAndUpdate({
        code: kod
    }, {
        $set: {
            codeName: rBody['codename'],
            codeCategory: rBody['category'],
            codeDesc: rBody['codedesc'],
            main: rBody['main'],
            commands: rBody['commands'],
        }
    }, function(err, docs) {})
    client.channels.cache.get(global.config.server.channels.codelog).send(new Discord.MessageEmbed()
        .setTitle("Code edited!").setColor("GREEN").setFooter(config.footer)
        .setDescription(`The user named **[${req.user.username}](https://discordevs.xyz/user/${req.user.id})** edited the code named **${rBody['codename']}**.`)
        .addField("Code Link", `https://disbotss.xyz/code/${kod}`, true)
        .addField("Code Description", rBody['codedesc'], true)
        .addField("Code Category", rBody['category'], true)
    )
    res.redirect('/code/' + kod)
});

module.exports = app;