// Note:    Your last action step, should include "Go To Previour Frame";
//          Then run script at the last position of frame&layer;
// set your action name
var act = "onetry"
var actset = "sasuke"
var doc = app.activeDocument;

// loop through all layers
for (var i = 0; i < doc.layers.length; i++) {
    doc.activeLayer = doc.layers[i];
    currentLayer = doc.activeLayer;
    app.doAction(act, actset);
}