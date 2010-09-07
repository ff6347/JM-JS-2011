/*
 @author fabianmoronzirfas
 a quick Textwhitener
 */


/*
 @author fabianmoronzirfas
 */
var myDoc = app.activeDocument;


for (var i = 0; i<app.selection.length; i++) {
	
try {
		var myImg = app.selection[i].images.item(0);

	} catch (e) {
	
}
try {
		myImg.fillColor =  myDoc.swatches.item(1);

	} catch (e) {
	
}

	if( app.selection[i] instanceof Polygon ){
	
try {
		app.selection[i].fillColor =  myDoc.swatches.item(1);

} catch (e) {
	
}

	
}

 if(app.selection[i] instanceof TextFrame){
 	
try {
			var myChars = app.selection[i].characters.everyItem();

} catch (e) {
	
}

		
try {
			var	myPars = app.selection[i].paragraphs.everyItem();

} catch (e) {
	
}

		
try {
			myChars.fillColor =  myDoc.swatches.item(1);

} catch (e) {
	
}

		
try {
			myPars.ruleAboveColor  = myDoc.swatches.item(1);

} catch (e) {
	
}

		
try {
			myPars.ruleBelowColor  = myDoc.swatches.item(1);

} catch (e) {
	
}

	
	}


}






/*

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



*/


alert("done");

 
 