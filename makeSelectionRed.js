/*
 @author fabianmoronzirfas
 a quick Textredener
 */

var myDoc = app.activeDocument;

	
try {
		var myColor = myDoc.colors.add({name:"ERRORRED", model:ColorModel.process, colorValue:[0, 100, 100, 0]});

} catch (e) {
	var myColor = myDoc.swatches.item("ERRORRED");
	
}





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
	 	myPars.ruleAboveColor  = myColor;// myDoc.swatches.item(2);

} catch (e) {
	
}

try {
		myPars.ruleBelowColor  = myColor;// myDoc.swatches.item(2);

} catch (e) {
	
}

	
try {
		myChars.fillColor = myColor;// myDoc.swatches.item(2);

} catch (e) {
	
}

try {
		myImg.fillColor =  myColor;//myDoc.swatches.item(2);

} catch (e) {
	
}



alert("done");

 
 