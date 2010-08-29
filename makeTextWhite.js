/*
 @author fabianmoronzirfas
 a quick Textwhitener
 */

var myDoc = app.activeDocument;

var	myPars = app.selection[0].paragraphs.everyItem();
var myChars = app.selection[0].characters.everyItem();

try {
	 	myPars.ruleAboveColor  = myDoc.swatches.item(1);

} catch (e) {
	
}

try {
		myPars.ruleBelowColor  = myDoc.swatches.item(1);

} catch (e) {
	
}

	
try {
		myChars.fillColor =  myDoc.swatches.item(1);

} catch (e) {
	
}


alert("done");

 
 