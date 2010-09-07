/*
 @author fabianmoronzirfas
 a quick Textwhitener
 */





var myDoc = app.activeDocument;


for (var i = 0; i < app.selection.length; i++) {

	try {
		var myPars = app.selection[i].paragraphs.everyItem();
		
	} 
	catch (e) {
	
	}
	
	
	try {
		var myChars = app.selection[i].characters.everyItem();
		
	} 
	catch (e) {
	
	}
	
	
	try {
		var myImg = app.selection[i].images.item(0);
		
	} 
	catch (e) {
	
	}
	
	
	
	try {
		myPars.ruleAboveColor = myDoc.swatches.item(1);
		
	} 
	catch (e) {
	
	}
	
	try {
		myPars.ruleBelowColor = myDoc.swatches.item(1);
		
	} 
	catch (e) {
	
	}
	
	
	try {
		myChars.fillColor = myDoc.swatches.item(1);
		
	} 
	catch (e) {
	
	}
	
	try {
		myImg.fillColor = myDoc.swatches.item(1);
		
	} 
	catch (e) {
	
	}
	
}





alert("done");

 
 