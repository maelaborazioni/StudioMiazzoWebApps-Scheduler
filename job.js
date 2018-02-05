/**
 * @properties={typeid:24,uuid:"7F8D735A-3208-43DB-AFE3-60B74F4AF3D9"}
 */
function createJobRecord()
{
	/** @type {JSFoundset<db:/svy_framework/scd>}*/
	var fsScd = databaseManager.getFoundSet(globals.Server.SVY_FRAMEWORK,'scd');
	var success = fsScd.newRecord();
	    
	return success;
}

/**
 * @AllowToRunInFind
 * 
 * @param {Number} scdId
 *
 * @properties={typeid:24,uuid:"2E6D3237-E766-4CD3-AB6A-103D2A2F5123"}
 */
function deleteJobRecord(scdId)
{
	/** @type {JSFoundset<db:/svy_framework/scd>}*/
	var fsScd = databaseManager.getFoundSet(globals.Server.SVY_FRAMEWORK,'scd');
	if(fsScd.find())
	{
		fsScd.scd_id = scdId;
		if(fsScd.search())
		{
			var success = fsScd.deleteRecord();
			return success;
		}
		
	}
	
	return false;	
}

/**
 * @AllowToRunInFind
 * 
 * Aggiorna lo stato del job avente l'identificativo specificato
 * 
 * @param {Number} scdId
 * @param {Number} status
 *
 * @properties={typeid:24,uuid:"C4D951BE-7C3A-4F6D-BB8B-0A2F280FB6AB"}
 */
function setJobStatus(scdId,status)
{
	/** @type {JSFoundset<db:/svy_framework/scd>}*/
	var fsScd = databaseManager.getFoundSet(globals.Server.SVY_FRAMEWORK,'scd');
	if(fsScd.find())
	{
		fsScd.scd_id = scdId;
		if(fsScd.search())
		{
			databaseManager.startTransaction();
			fsScd.job_status = status;
			if(!databaseManager.commitTransaction())
			{
				globals.ma_utl_showErrorDialog('Errore durante l\'update del record relativo al job ' + fsScd.job_name
					                           ,'Scheduler');
			}
		}
		else
			globals.ma_utl_showWarningDialog('Update non riuscito : nessun job trovato','Scheduler');
	}
}

/**
 * @AllowToRunInFind
 *
 * @param {String} [solutionName]
 *
 * @properties={typeid:24,uuid:"445FB3B1-B297-48DF-B91A-68FB5A2161EB"}
 */
function resetScheduler(solutionName)
{
	/** @type {JSFoundset<db:/svy_framework/scd>}*/
	var fsScd = databaseManager.getFoundSet(globals.Server.SVY_FRAMEWORK,'scd');
	if(fsScd.find())
	{
		// se esplicitata la specifica soluzione
		if(solutionName != undefined)
			fsScd.solution_name = solutionName;
		
		fsScd.job_status = 1; // solo jobs attivi
		if(fsScd.search())
		{
		   for(var j = 1; j <= fsScd.getSize(); fsScd++)
		   {
			   var currjob = fsScd.getRecord(j);
			   startJobInScheduler(currjob.job_name,currjob.cron_timings,currjob.method_name,globals.TODAY,null,currjob.method_args.split(','));
		   }
		}
	}
}

/**
 * Lancia l'esecuzione del job avente i parametri specificati
 * 
 * @param {String} jobName
 * @param {String} cronTimings
 * @param {String} methodName
 * @param {Date} startDate
 * @param {Date} endDate
 * @param {Array} methodArgs
 *
 * @properties={typeid:24,uuid:"99A21736-7B87-4427-9CAD-391242612878"}
 * @SuppressWarnings(wrongparameters)
 */
function startJobInScheduler(jobName,cronTimings,methodName,startDate,endDate,methodArgs)
{
	 plugins.scheduler.addCronJob(jobName,cronTimings,solutionModel.getGlobalMethod('globals',methodName),startDate,endDate,methodArgs);
}

/**
 * Scrive il messaggio nel log delle informazioni relativo ai jobs attivi
 *  
 * @param {String} message
 *
 * @properties={typeid:24,uuid:"5F672529-8CB1-4FA5-B41C-932900656CB5"}
 */
function writeJobInfo(message)
{
	// TODO creare un file di testo per il log ed utilizzare quello...
//	var frm = forms.scd_tab;
//	frm.vSchedulerJobsInfo += (utils.dateFormat(new Date(),globals.LOGINFO_DATEFORMAT) + '  ' + message + '\n'); 
    application.output(message,LOGGINGLEVEL.INFO);
}

/**
 * Elimina i messaggi esistenti relativi ai jobs attivi 
 * 
 * @properties={typeid:24,uuid:"D046BA52-9412-4571-996E-E1741835D99F"}
 */
function deleteAllJobsInfo()
{
	var frm = forms.scd_tab;
	frm.vSchedulerJobsInfo = '';
}