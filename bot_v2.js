/* Guild generated with create-discord-bot CLI */

const Discord = require('discord.js');
const Sequelize = require('sequelize');

const client = new Discord.Client();
const PREFIX = '!';
//const cabecario = '▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼\n▼▼▼▼▼▼▼    Salários da Semana    ▲▲▲▲▲▲▲\n▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲';
//const rodape = '▼▼▼▼▼▼▼           fim            ▲▲▲▲▲▲▲';
// [alpha]

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    operatorsAliases: false,
    // SQLite only
    storage: 'database.sqlite',
});

// [beta]

/*
 * equivalent to: CREATE TABLE tags(
 * name VARCHAR(255),
 * description TEXT,
 * username VARCHAR(255),
 * usage INT
 * );
 */
const Tags = sequelize.define('tags', {
    name: {
        type: Sequelize.STRING,
        unique: true,
    },
    description: Sequelize.STRING,
   // username: Sequelize.STRING,
    usage_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
});

client.once('ready', () => {
    // [gamma]
    Tags.sync();
     console.log('Bot is ready!');
});

client.on('message', async message => {
    if (message.content.startsWith(PREFIX) && message.channel.name === "teste-bot-contrato") {
        const input = message.content.slice(PREFIX.length).split(' ');
        const command = input.shift();
        const commandArgs = input.join(' ');

        if (command === 'add') { 
            // [delta]
            const splitArgs = commandArgs.split(' ');
            const tagName = splitArgs.shift();
            const tagDescription = splitArgs.join(' ');
            //message.channel.send(message.channel.name);
            try {
                // equivalent to: INSERT INTO tags (name, descrption, username) values (?, ?, ?);
                const tag = await Tags.create({
                    name: tagName,
                    description: tagDescription,
                   // username: message.author.username,
                });

                 return message.reply(`Jogador ***${tag.name}*** adicionado.`);
            }
            catch (e) {
                if (e.name === 'SequelizeUniqueConstraintError') {
                    return message.reply('Jogador já está adiconado.');
                }
                return message.reply('oo goias deu bosta.');
            }
        }
        else if (command === 'con') {
            const tagName = commandArgs;

            // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
            const tag = await Tags.findOne({ where: { name: tagName } });
            if (tag) {
                // equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
                if (tag.get('usage_count') < 5) {
                  tag.increment('usage_count');
                }
                else {
                  return message.channel.send(`***${tagName}*** limite de salário máximo`);
                }
               // message.channel.send(`${tagName} renovou ${tag.usage_count} contratos, salario de ${tag.description}.`);

               // const tag2 = await Tags.findOne({ where: { name: tagName } });
               // message.channel.send(`${tag2.name} renovou ${tag2.usage_count} contratos, salario de ${tag2.description}.`);

                if (tag.get('usage_count') + 1 === 1) {
                  Tags.update({ description: '350k' }, { where: { name: tagName } });
                }
                else if (tag.get('usage_count') + 1  === 2) {
                  Tags.update({ description: '700k' }, { where: { name: tagName } });
                
                } 
                else if (tag.get('usage_count') + 1  === 3) {
                  Tags.update({ description: '1.4kk' }, { where: { name: tagName } });
                
                } 
                else if (tag.get('usage_count') + 1  === 4) {
                  Tags.update({ description: '2.5kk' }, { where: { name: tagName } });
                
                } 
                else if (tag.get('usage_count') + 1  === 5) {
                  Tags.update({ description: '5kk' }, { where: { name: tagName } });
                
                }
                const tag2 = await Tags.findOne({ where: { name: tagName } });
                return message.channel.send(`***${tagName}*** renovou ***${tag2.usage_count}*** contratos, salario de ***${tag2.description}***.`);
            }
            
            return message.reply(`Jogador ***${tagName}*** não encontrado`);
              // [epsilon] ok
        }
        else if (command === 'editar') {
            const splitArgs = commandArgs.split(' ');
            const tagName = splitArgs.shift();
            const tagDescription = splitArgs.join(' ');

            // equivalent to: UPDATE tags (descrption) values (?) WHERE name='?';
            const affectedRows = await Tags.update({ description: tagDescription }, { where: { name: tagName } });
            if (affectedRows > 0) {
                return message.reply(`Tag ${tagName} was edited.`);
            }
            return message.reply(`Could not find a tag with name ${tagName}.`);
            // [zeta]
        }
        else if (command === 'info') {
            const tagName = commandArgs;

            // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
            const tag = await Tags.findOne({ where: { name: tagName } }); 
            if (tag) {
                return message.channel.send(`***${tagName}*** renovou ***${tag.usage_count}*** contratos, salario de ***${tag.description}***.`);
            }
            return message.reply(`Não foi encontrado: ***${tagName}***`);
              // [theta]
        }
        else if (command === 'lista') {
            // equivalent to: SELECT name FROM tags;
            const tagList = await Tags.findAll({ attributes: ['name'] });
            const tagString = tagList.map(t => t.name).join(', \n ') || 'No tags set.';
            var listapronta = '▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼\n▼▼▼▼▼▼▼    ***Salários da Semana***   ▲▲▲▲▲▲▲\n▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲';
            //message.channel.send(cabecario);
              for (var i=0; i < tagList.length; i++) {
                const tag2 = await Tags.findOne({ where: { name: tagList[i].name }});
                const tag2Name = capitalizeFirstLetter(tagList[i].name);
                listapronta = listapronta + `\n${tag2Name} - ***${tag2.description}*** ${tag2.usage_count}`;
                                //message.channel.send(`${tag2Name} - ***${tag2.description}*** ${tag2.usage_count}` );

                //message.channel.send(tagList[i].name)
              }
            listapronta = listapronta + '\n▼▼▼▼▼▼▼▼             ***Fim***              ▲▲▲▲▲▲▲▲';
            //message.channel.send(tagList.length);   
            //message.channel.send(); 

               
            return message.channel.send(listapronta);  //message.channel.send(rodape);//message.channel.send(`List of tags: ${tagString}`);
            // [lambda]
        }
        else if (command === 'remover') {
            const tagName = commandArgs;
            // equivalent to: DELETE from tags WHERE name = ?;
            const rowCount = await Tags.destroy({ where: { name: tagName } });
            if (!rowCount) return message.reply('Jogador inexistente.');

            return message.reply('Jogador foi removido.');
            // [mu]
        }

        else if (command === 'semana') {
            const tagList = await Tags.findAll({ attributes: ['name'] });
            const tagString = tagList.map(t => t.name).join(', \n ') || 'No tags set.';
           
              for (var i=0; i < tagList.length; i++) {
                Tags.update({ usage_count: 0 }, { where: { name: tagList[i].name } });
                                //message.channel.send(tagList[i].name)
              }
            return message.reply('Os contratos foram zerados.');
            // [mu]
        }



    }
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function gerar_lista(string) { 
  return 
}
/*
client.login('pleaseinsertyourtokenheresothistutorialcanwork');


















const Discord = require('discord.js')
const client = new Discord.Client()

const guild = Struct('nome', 'cont');
	

client.on('ready', () => {
    console.log('Bot is ready!')
})


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



*/

client.login('NDUwNzE5MzI4Nzk1NjIzNDI0.De3byA.0W_JiXZszGGqN4t0XG9M9dd0708');