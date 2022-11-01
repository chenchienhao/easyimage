function MoveLayerTo(fLayer, startX, fX,fY) {
    var  Position = fLayer.bounds;
    
    Position[0] = Position[0] - startX - fX;
    Position[1] = Position[1] - fY ;
    fLayer.translate(-Position[0],-Position[1]);
}

var file = File.openDialog ("please select file", '*gif', Multiselect = false)

if(file){
    var doc = app.open(File(file));

    var width = parseInt(app.activeDocument.width.toString().replace(' px', ''), 10 );
    var height = parseInt(app.activeDocument.height.toString().replace(' px', ''), 10 );
    var layers = app.activeDocument.layers;
    alert("size>>"+width+"x"+height+"; frames>>"+layers.length+";");
    var bounds = [0, 0, width*layers.length, height];
    doc.crop(bounds);

    for (var m = 0; m < layers.length; m++) {
        app.activeDocument.activeLayer = layers[m];
        var currentLayer = app.activeDocument.activeLayer;
        MoveLayerTo(currentLayer,0,width*m,0);
    }
    activeDocument.mergeVisibleLayers();
}