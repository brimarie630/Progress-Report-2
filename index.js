const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, chatInputApplicationCommandMention } = require(`discord.js`);

const prefix = '>';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildIntegrations] });

client.on("ready", () => {
    console.log("Bot is online!");

    client.user.setActivity(`Subscribe to MrJAwesome`, {type: "WATCHING" });

})

client.on("messageCreate", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command =args.shift().toLowerCase();

    //message array

    const messageArray = message.content.split(" ");
    const argument = messageArray.slice(1);
    const cmd = messageArray[0];

    //COMMANDS

    //test command
    if (command === 'test') {
        message.channel.send("Bot is working!");
    }else if(command === 'cat_create'){
        if(argument.length!=2){
            message.channel.send("Incorrect amount of arguments. Arguments: cat_name, role_name.");
            return;
        }
        //Grab name
        var cat_name = argument[0];

        var role_name = argument[1];

        var roleID = message.guild.roles.cache.find((r) => r.name === role_name);

        const { PermissionsBitField } = require('discord.js');

        //Create Category
        message.guild.channels.create({
            name: cat_name,
            type: 4,
        }).then(cat => {
            message.guild.channels.create('announcements', {
                type: 0,
                parent: cat,
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        allow: ['VIEW_CHANNEL'],
                    }]
            });

        //Victory
        message.channel.send("Created category named: " + cat_name);

        //Create Channels
        //announcements
        //zoom-meeting-info
        //introduce-yourself
        //chat

       // var catID = message.guild.channels.cache.find((c) => c.name === cat_name);
       // message.guild.channels.create({
         //   name: 'announcements',
        //    type: 2,
          //  parent: catID,
        });


    }else if(command === 'chan_create'){
        if(argument.length!=1){
            message.channel.send("Incorrect amount of arguments. Arguments: chan_name.");
            return;
        }
        //Grab name
        var chan_name = argument[0];

        //Create Channel
        message.guild.channels.create({
            name: chan_name,
            type: 2,
        });

        //Victory
        message.channel.send("Created category named: " + chan_name);
    
        // Create a new role

        
    //}else if(command === 'role_create' + role_name){
    //guild.roles.create({
     //   name: role_name,
      //  color: 'BLUE',
     //   reason: 'we needed a role for Super Cool People',
    
        //.then(console.log)
        //.catch(console.error);
    
    //Create a new role attempt 2
    }else if(command === 'role_create'){
    guild.roles.create({ 
        name: 'Mod',
        permissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.KickMembers] 
    }); 
}
    
    


});

       


client.login("MTA2NjE1MzMzODg5NjQwNDU5MQ.G4-QV-.IPeWC0aKyQB7Iiig5oBuNsFrMgA-HbSROlbmWs");

