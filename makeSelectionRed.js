/*
 @author fabianmoronzirfas
 */

var myDoc = app.activeDocument;

var myColor;

try {
	 myColor = myDoc.swatches.add({name:"ERRORRED", model:ColorModel.process, colorValue:[0, 100, 100, 0]});

} catch (e) {
	
	myColor = myDoc.swatches.item("ERRORRED");
	
}



var myDoc = app.activeDocument;


for (var i = 0; i<app.selection.length; i++) {
	
try {
		var myImg = app.selection[i].images.item(0);

	} catch (e) {
	
}
try {
		myImg.fillColor =   myColor;//myDoc.swatches.item(2);

	} catch (e) {
	
}

	if( app.selection[i] instanceof Polygon ){
	
try {
		app.selection[i].fillColor =  myColor;// myDoc.swatches.item(2);

} catch (e) {
	
}

	
}

// if(app.selection[i] instanceof TextFrame){
 	
try {
			var myChars = app.selection[i].characters.everyItem();

} catch (e) {
	
}

		
try {
			var	myPars = app.selection[i].paragraphs.everyItem();

} catch (e) {
	
}

		
try {
			myChars.fillColor =  myColor;// myDoc.swatches.item(2);

} catch (e) {
	
}

		
try {
			myPars.ruleAboveColor  = myColor;// myDoc.swatches.item(2);

} catch (e) {
	
}

		
try {
			myPars.ruleBelowColor  =  myColor;//myDoc.swatches.item(2);

} catch (e) {
	
}

	
	//}


}





	
	
	/*

	
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
*/

alert("done");

 
 