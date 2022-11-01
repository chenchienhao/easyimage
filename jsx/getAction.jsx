//Get selected action
var ref = new ActionReference();
ref.putEnumerated( charIDToTypeID("Actn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") ); 
var desc = executeActionGet(ref);
var actionName = desc.getString( charIDToTypeID("Nm  ") );
var actionSetName = desc.getString( charIDToTypeID("PrNm") );
alert("here we go>>"+actionSetName+"-"+actionName);