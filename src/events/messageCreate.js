/**
 * @author Benjamin Guirlet
 * @description
 *		Handler of the 'messageCreate' event.
 */


const sqlUtils = require( "../utils/sqlUtils" );
const msgUtils = require( "../utils/messageUtils" );
const { LIKE_EMOJI, REPOST_EMOJI } = require( "../files/config.json" );
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
	const channel = await sqlUtils.getChannel( message.channelId );

	if ( !channel )
		return;

	if ( channel["memes"] ) {
		if ( await msgUtils.hasMeme( message ) ) {
			await msgUtils.addMemeToDatabase( message, 0, 0 );

			await message.react( LIKE_EMOJI );
			await message.react( REPOST_EMOJI );
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
