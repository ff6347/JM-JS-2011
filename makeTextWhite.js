/*
 @author fabianmoronzirfas
 a quick Textwhitener
 */

var myDoc = app.activeDocument;
var	myPars = app.selection[0].paragraphs.everyItem();
var myChars = app.selection[0].characters.everyItem();

 	myPars.ruleAboveColor  = myDoc.swatches.item(1);
	myPars.ruleBelowColor  = myDoc.swatches.item(1);
	
	myChars.fillColor =  myDoc.swatches.item(1);

alert("done");

 
 