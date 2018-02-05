
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"E8B1E820-EFC4-4245-AA0B-6F972C9E3D1D"}
 */
function saveJobRecord(event)
{
	if(!databaseManager.commitTransaction())
	{
		application.output(globals.ma_utl_getDatabaseErrors());
		databaseManager.rollbackTransaction();
		globals.ma_utl_showErrorDialog('Errore durante il salvataggio del job');
	}
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	globals.svy_mod_closeForm(event);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"7E3AE835-25B9-4CE9-AB8E-5D9D25752F50"}
 */
function cancel(event) 
{
	databaseManager.rollbackTransaction();
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	globals.svy_mod_closeForm(event);
}
