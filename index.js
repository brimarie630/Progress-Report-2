const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, chatInputApplicationCommandMention, Colors } = require(`discord.js`);

const prefix = '>';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildMessageReactions] });

client.on("ready", async () => {
    console.log("Bot is online!");
    const guild = await client.guilds.fetch('1066155394730311791');
    const channel = guild.channels.cache.get('1095840542597840966');
    const message = await channel.messages.fetch('1095869865975349341');

    client.user.setActivity(`Testing`, {type: "WATCHING" });

})

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        console.log('Something went wrong when fetching the message: ', error);
        return;
      }
    }

     
    const guild = client.guilds.cache.get('1066155394730311791');
    const member = guild.members.cache.get(user.id);
    const role = guild.roles.cache.find(role => role.name === 'newrole');

    if (member && role) {
        member.roles.add(role).catch(console.error);
    
    }
});

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
            permissionOverwrites: [
                {
                  id: message.guildId,
                  deny: [PermissionsBitField.Flags.ViewChannel],
               },
               {
                id: roleID,
                allow: [PermissionsBitField.Flags.ViewChannel],
                },
            ],
        }).then(cat => {
            message.guild.channels.create( {
                name: 'announcements',
                type: 0,
                parent: cat,
            });
            message.guild.channels.create( {
                name: 'zoom-meeting-info',
                type: 0,
                parent: cat,
            });
            message.guild.channels.create( {
                name: 'introduce-yourself',
                type: 0,
                parent: cat,
            });
            message.guild.channels.create( {
                name: 'chat',
                type: 0,
                parent: cat,
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


    }else if(command === 'voice_chan_create'){
        if(argument.length!=2){
            message.channel.send("Incorrect amount of arguments. Arguments: chan_name, cat_name.");
            return;
        }
        //Grab name
        var chan_name = argument[0];
        var cat_name = argument[1];

        //var roleID = message.guild.roles.cache.find((r) => r.name === role_name);
        var catID = message.guild.channels.cache.find((cat) => cat.name === cat_name);

        //Create Voice Channel
        message.guild.channels.create({
            name: chan_name,
            type: 2,
            parent: catID,
        });

        //Victory
        message.channel.send("Created voice channel named: " + chan_name);
    
        // Create a new role


   
    
   //create text channel
    }else if(command === 'text_chan_create'){
        if(argument.length!=2){
            message.channel.send("Incorrect amount of arguments. Arguments: chan_name, cat_name.");
            return;
        }
        //Grab name
        var chan_name = argument[0];
        var cat_name = argument[1];

        //var roleID = message.guild.roles.cache.find((r) => r.name === role_name);
        var catID = message.guild.channels.cache.find((cat) => cat.name === cat_name);

        //Create Text Channel
        message.guild.channels.create({
            name: chan_name,
            type: 0,
            parent: catID,
        });

        //Victory
        message.channel.send("Created text channel named: " + chan_name);

    }else if(command === 'role_create'){
        if(argument.length!=2){
            message.channel.send("Incorrect amount of arguments. Arguments: role_name, color.");
            return;
        }
        //Grab name
        var role_name = argument[0];
        var color = argument[1];
        var color_code = "";
        
        switch(color){
            case "red": 
                color_code = "#ff0000";
                break;
            case "pink":
                color_code = "#FFC0CB";
                break;
            case "purple":
                color_code = "#800080";
                break;
            case "blue":
                color_code = "#0000FF";
                break;
            default:
                color_code = "#ffff";
        }

        message.guild.roles.create({ 
            name: role_name,
            color: color_code
        }); 
    }
    
    


});



client.login("token");

