function CreateDoc(width,height,resolution,name,mode,initialFill) {
    app.documents.add(
        width, 
        height, 
        resolution, 
        name,
        mode,
        initialFill
    );
}
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
//Initialize a Doc
CreateDoc(10,10,72,"mergedPNG",NewDocumentMode.RGB,DocumentFill.TRANSPARENT)

function MoveLayerTo(fLayer, startX, fX,fY) {
    var  Position = fLayer.bounds;
    
    Position[0] = Position[0] - startX - fX;
    Position[1] = Position[1] - fY ;
    fLayer.translate(-Position[0],-Position[1]);
}

var newDoc = app.documents[0];
var newDocWidth = 0;
var newDocHeight = 0;
var act = "selectInverseCrop"
var actset = "crop"
var openedWidth = []
var openedHeight = []

var theFolder = Folder.selectDialog("select folder");
if (theFolder) {
    var theFiles = theFolder.getFiles(/\.(png)$/i);
    //example file path "C:\\Users\\anima\\Desktop\\test\\CG.png"
    for (var m = 0; m < theFiles.length; m++) {
        var theFile = theFiles[m].path;
        theFile = theFile.replace("~", "C:/Users/anima");
        theFile = theFile.replace(/\//g, '\\\\');
        theFile = theFile + '\\\\' + theFiles[m].name
        app.open(File(theFile));

        if( m == 0) {
            var width = parseInt(app.activeDocument.width.toString().replace(' px', ''), 10 );
            var height = parseInt(app.activeDocument.height.toString().replace(' px', ''), 10 );
            newDocWidth = width*theFiles.length;
            newDocHeight = height;
            alert("size:"+width+"x"+height+"; frames:"+theFiles.length+";");

            app.activeDocument = newDoc;
            app.activeDocument.resizeImage(newDocWidth,newDocHeight);
        }
        openedDoc = app.documents[1];
        app.activeDocument = openedDoc;
        app.doAction(act, actset);
        app.activeDocument.selection.copy();
        openedWidth.push(parseInt(app.activeDocument.width.toString().replace(' px', ''), 10 ));
        openedHeight.push(parseInt(app.activeDocument.height.toString().replace(' px', ''), 10 ));
        
        closeWithoutSaving();
        app.activeDocument = newDoc;
        app.activeDocument.paste();
        
        var currentLayer = app.activeDocument.activeLayer;
        MoveLayerTo(currentLayer,(newDocWidth/theFiles.length-openedWidth[0])/2,newDocWidth/theFiles.length*m,(newDocHeight-openedHeight[m]))
    }
    try{
        activeDocument.mergeVisibleLayers();
    }catch(e){
    }
};