/**
 * @author Benjamin Guirlet
 * @description
 *      Contains the command 'reposts'.
 *      It allows the administrators to define in which channel the repost feature is enabled.
 */


const { SlashCommandBuilder } = require( "@discordjs/builders" );
const { CommandInteraction } = require( "discord.js" );
const sqlUtils = require( "../../utils/sqlUtils" );
const { ADMINS } = require("../../files/config.json");


/* ----------------------------------------------- */
/* COMMAND BUILD                                   */
/* ----------------------------------------------- */
const slashCommand = new SlashCommandBuilder()
	.setName( "reposts" )
	.setDescription( "Permet de d'ajouter ou enlever le salon courant comme un salon de reposts pour le bot." )
	.addSubcommand( subCommand =>
		subCommand
			.setName( "set" )
			.setDescription( "Défini le salon courant comme salon de reposts." )
	)
	.addSubcommand( subCommand =>
		subCommand
			.setName( "remove" )
			.setDescription( "Enlève le salon courant comme salon de reposts." )
	);


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Function called when the command 'reposts'
 * @param {CommandInteraction} interaction The interaction generated by the command's execution.
 */
async function execute( interaction ) {
	if ( !ADMINS.includes( interaction.user.id ) ) {
		await interaction.reply(
			{ content: "Vous n'avez pas les permissions pour exécuter cette commande.", ephemeral: true }
		);
		return;
	}

	switch ( interaction.options.getSubcommand() ) {
		case 'set':
			await sqlUtils.updateChannel( interaction.channelId, "reposts", true );
			await interaction.reply(
				{ content: "Ce salon est maintenant un salon de reposts!", ephemeral: true }
			);
			break;
		case 'remove':
			await sqlUtils.updateChannel( interaction.channelId, "reposts", false );
			await interaction.reply(
				{ content: "Ce salon n'est plus un salon de reposts!", ephemeral: true }
			);
			break;
	}
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	data: slashCommand,
	execute
}