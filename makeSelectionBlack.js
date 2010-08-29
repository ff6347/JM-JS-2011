/*
 @author fabianmoronzirfas
 a quick Textwhitener
 */

var myDoc = app.activeDocument;

try {
	var	myPars = app.selection[0].paragraphs.everyItem();

} catch (e) {
	
}


try {
	var myChars = app.selection[0].characters.everyItem();

} catch (e) {
	
}


try {
	var myImg = app.selection[0].images.item(0);

} catch (e) {
	
}



try {
	 	myPars.ruleAboveColor  = myDoc.swatches.item(2);

} catch (e) {
	
}

try {
		myPars.ruleBelowColor  = myDoc.swatches.item(2);

} catch (e) {
	
}

	
try {
		myChars.fillColor =  myDoc.swatches.item(2);

} catch (e) {
	
}

try {
		myImg.fillColor =  myDoc.swatches.item(2);

} catch (e) {
	
}







alert("done");

 
 