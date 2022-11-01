var act = "onetry"
var actset = "sasuke"

var theFolder = Folder.selectDialog("select folder");

function closeWithoutSaving() {
	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};
	var descriptor = new ActionDescriptor();
	descriptor.putEnumerated( s2t( "saving" ), s2t( "yesNo" ), s2t( "no" ) );
	descriptor.putInteger( s2t( "documentID" ), 2037 );
	descriptor.putBoolean( s2t( "forceNotify" ), true );
	executeAction( s2t( "close" ), descriptor, DialogModes.NO );
}

function SaveBMP(saveFile){
    var bmpSaveOptions = new BMPSaveOptions();
    bmpSaveOptions.alphaChannels = false;
    bmpSaveOptions.depth = BMPDepthType.EIGHT;
    bmpSaveOptions.osType = OperatingSystem.WINDOWS;
    bmpSaveOptions.rleCompression = false;
    app.activeDocument.saveAs(saveFile, bmpSaveOptions, true,Extension.LOWERCASE);
}

if (theFolder) {

    var theFiles = theFolder.getFiles(/\.(jpg|tif|eps|bmp|psd)$/i);
    //example file path "C:\\Users\\anima\\Desktop\\test\\CG0000495.bmp"
    for (var m = 0; m < theFiles.length; m++) {
        var theFile = theFiles[m].path;
        theFile = theFile.replace("~", "C:/Users/anima");
        theFile = theFile.replace(/\//g, '\\\\');
        theFile = theFile + '\\\\' + theFiles[m].name
        //alert("here we go>>"+theFile);
        app.open(File(theFile));
        app.doAction(act, actset);
        var saveFile = new File(theFile);
        SaveBMP(saveFile);

        closeWithoutSaving();
    }
};