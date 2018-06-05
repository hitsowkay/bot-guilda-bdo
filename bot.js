/* Guild generated with create-discord-bot CLI */
const Discord = require('discord.js')
const client = new Discord.Client()

const guild = Struct('nome', 'cont');
	

client.on('ready', () => {
    console.log('Bot is ready!')
})

/*
client.on('message', msg => {
  switch (msg.content[1-3]) {
  	case 'reg':
  		//algo
  		break;
  	 case 'inf':
  		//algo
  		break;
  	 case 'con':
  		//algo
  		break;
  	 case 'rem		':
  		//algo
  		break;
  	case '':
 	 	//algo
  		break;
  	 	case 'registar':
  	//algo
  	break;
  }

  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});
*/


client.on('message', msg => {
//	var temp2 = msg.content;
//	var temp1 = temp2.substring(0,3);
//	var temp3 = temp2.substring(4,6)
  if (msg.content === 'ping') {
  	var temp = msg.content;
    msg.reply(msg.content.substring(0,3));
  }
  if (msg.content.substring(0,3) === 'reg') {
  	msg.reply(msg.content.substring(4,8));
  	guild[0].nome() = msg.content.substring(4,8)
  	msg.replu(guild[1].nome());
  }

});





client.login('NDUwNzE5MzI4Nzk1NjIzNDI0.De3byA.0W_JiXZszGGqN4t0XG9M9dd0708');