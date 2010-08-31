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
		myPars.ruleAboveColor = myColor;// myDoc.swatches.item(2);
	} 
	catch (e) {
	
	}
	
	try {
		myPars.ruleBelowColor = myColor;// myDoc.swatches.item(2);
	} 
	catch (e) {
	
	}
	
	
	try {
		myChars.fillColor = myColor;// myDoc.swatches.item(2);
	} 
	catch (e) {
	
	}
	
	try {
		myImg.fillColor = myColor;//myDoc.swatches.item(2);
	} 
	catch (e) {
	
	}
	
}

alert("done");

 
 