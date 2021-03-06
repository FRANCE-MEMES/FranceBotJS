/**
 * @author Benjamin Guirlet
 * @description
 * 		The base file of the bot.
 */


const { TOKEN, GUILD_ID } = require( "./files/config.json" );
const { Client, Collection, Intents } = require( "discord.js" );
const { loadCommands, loadEvents } = require( "./utils/loadAssets" );
const { loadCommandsToGuild } = require( "./utils/registerCommands" );


const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS
	],
	partials: [
		"MESSAGE",
		"REACTION"
	]
});


client.commands = new Collection();
(async () => {
	await loadCommands( client );
	await loadEvents( client );
	await client.login( TOKEN );
	// Out-comment the following line if the commands where modified/added to upload the commands to the guild.
	// await loadCommandsToGuild( client.user.id, GUILD_ID, TOKEN );
})();


module.exports = {
	client: client
}

/* ----------------------------------------------- */
/* COMMAND BUILD                                   */
/* ----------------------------------------------- */
/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
