/**
 * @author Benjamin Guirlet
 * @description
 *		This event is used to store the memes in the database and add their initial reactions.
 */


const sqlUtils = require( "../utils/sqlUtils" );
const msgUtils = require( "../utils/messageUtils" );
const { LIKE_EMOJI_MENTION, REPOST_EMOJI_MENTION } = require( "../files/config.json" );
const { Client, Message } = require( "discord.js" );


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */


/**
 * Function called when the event 'messageCreate' is emitted.
 * @param {Message} message The message created.
 * @param {Client} client The client that emitted the event.
 */
async function execute( message, client ) {
	const channel = await sqlUtils.fetchChannel( message.channelId );
	if ( !channel )
		return;

	if ( channel["memes"] ) {
		const isAMeme = await msgUtils.addMemeToDatabase( message, 0, 0 );
		if ( isAMeme ) {
			await message.react( LIKE_EMOJI_MENTION );
			await message.react( REPOST_EMOJI_MENTION );
		}
		else {
			await message.delete();
			return;
		}
	}
	if ( channel["threads"] )
	{
		if ( !message.interaction )
		{
			await message.startThread({
				name: `Réponse | ${message.author.username} (${message.author.id})`,
				autoArchiveDuration: 1440 });
		}
	}
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	name: "messageCreate",
	execute
}
