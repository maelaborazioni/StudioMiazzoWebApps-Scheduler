/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"03AB4100-3C3E-47A3-AA6A-5426AC2597D2"}
 */
var vSchedulerJobsInfo = '';
/**
 *
 * @param {JSEvent} _event
 * @param {String} _triggerForm
 * @param {String} _forceForm
 *
 * @properties={typeid:24,uuid:"E843C897-F5F6-4A8D-9A26-9935689EAE1F"}
 */
function dc_new(_event, _triggerForm, _forceForm) 
{
	/** @type {JSFoundset<db:/svy_framework/scd>}*/
	var fsScd = databaseManager.getFoundSet(globals.Server.SVY_FRAMEWORK,'scd');
	var success = fsScd.newRecord();
	
	if(success == -1)
	{
		globals.ma_utl_showErrorDialog('Errore durante la creazione del record relativo al nuovo job','Scheduler');
        return;
	}
	
	databaseManager.startTransaction();
	var frm = forms.scd_dtl;
	globals.ma_utl_setStatus(globals.Status.EDIT,frm.controller.getName());
	globals.ma_utl_showFormInDialog(frm.controller.getName(),'Job scheduler',fsScd);
}

/**
*
* @param {JSEvent} _event
* @param {String} _triggerForm
* @param {String} _forceForm
* @param {Boolean} _noConfirm
*
* @properties={typeid:24,uuid:"99FE2B7C-CB81-4C4B-B256-5019F7D0546D"}
*/
function dc_delete(_event, _triggerForm, _forceForm, _noConfirm)
{
	if(!scopes.job.deleteJobRecord(foundset.scd_id))
	{
		globals.ma_utl_showErrorDialog('Errore durante l\' eliminazione del job','Scheduler');
        return;
	}
}

/**
*
* @param {JSEvent} _event
* @param {String} _triggerForm
* @param {String} _forceForm
*
* @properties={typeid:24,uuid:"742C8307-9B7F-4EC7-AD59-5E61D6C86FA7"}
*/
function dc_edit(_event, _triggerForm, _forceForm) 
{
	databaseManager.startTransaction();
	var frm = forms.scd_dtl;
	globals.ma_utl_setStatus(globals.Status.EDIT,frm.controller.getName());
	globals.ma_utl_showFormInDialog(frm.controller.getName(),'Job scheduler',foundset);
}
