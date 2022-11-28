const Discord = require("discord.js");
const samp = require("samp-query");
require("dotenv").config();
const client = new Discord.Client({
  intents: 32767,
});

client.on("ready", (client) => {
  client.user.setActivity("SAMP BOT By Jeje", { type: "COMPETING" });
  console.log(`Ready ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  let msgArray = message.content.split(" "); // Splits the message content with space as a delimiter
  let prefix = process.env.PREFIX;
  let command = msgArray[0].replace(prefix, ""); // Gets the first element of msgArray and removes the prefix
  let args = msgArray.slice(1); // Remove the first element of msgArray/command and this basically returns the arguments

  if (command === "samp") {
    const split = args.join(" ").split(":");
    const ip = split[0];
    const port = split[1];
    if (!ip || !port) return message.reply("Masukin ip port example 127.0.0.1:7777");
    var options = {
      host: ip,
      port: port,
    };
    samp(options, function (error, response) {
      if (error) {
        console.log("Error")
        message.channel.send("Invalid IP:PORT");
      } else {
        const embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setThumbnail("https://i.imgur.com/QYeGxrV.png")
          .setAuthor(response["hostname"])
          .addField("Gamemode", `${response["gamemode"]}`)
          .addField("Mapname", `${response["mapname"]}`)
          .addField("Version", `${response["rules"].version}`)
          .addField("Players", `${response["online"]}/${response["maxplayers"]}`)
          .addField("Website", `${response["rules"].weburl}`)
          .addField("Time", `${response["rules"].worldtime}`)
          .addField("Map", `${response["rules"].mapname}`);
        message.reply({ embeds: [embed] });
      }
    });
  }
});

client.login(process.env.TOKEN);
