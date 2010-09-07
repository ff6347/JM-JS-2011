/*
 @author fabianmoronzirfas
 a quick Textwhitener
 */

var myDoc = app.activeDocument;


// Create a list of swatches
var list_of_swatches = myDoc.swatches.everyItem().name;

// Make dialog box for selecting the swatch
var swatch_dialog = app.dialogs.add({name:"Index from colour"});
with(swatch_dialog.dialogColumns.add()) {
	with(borderPanels.add()) {
		with(dialogColumns.add()) {
			staticTexts.add({staticLabel:"Swatches:"});
		}
		with(dialogColumns.add()) {
			var selected_swatch = dropdowns.add({stringList:list_of_swatches, selectedIndex:0});
		}
	}
}
swatch_dialog.show();


for (var i = 0; i<app.selection.length; i++) {
	
try {
		var myImg = app.selection[i].images.item(0);

	} catch (e) {
	
}
try {
		myImg.fillColor =  myDoc.swatches.item(selected_swatch.selectedIndex);

	} catch (e) {
	
}

	if( app.selection[i] instanceof Polygon ){
	
try {
		app.selection[i].fillColor =  myDoc.swatches.item(selected_swatch.selectedIndex);

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
			myChars.fillColor =  myDoc.swatches.item(selected_swatch.selectedIndex);

} catch (e) {
	
}

		
try {
			myPars.ruleAboveColor  = myDoc.swatches.item(selected_swatch.selectedIndex);

} catch (e) {
	
}

		
try {
			myPars.ruleBelowColor  = myDoc.swatches.item(selected_swatch.selectedIndex);

} catch (e) {
	
}

	
	}


}
/*


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
		myPars.ruleAboveColor = myDoc.swatches.item(selected_swatch.selectedIndex);
		
	} 
	catch (e) {
	
	}
	
	try {
		myPars.ruleBelowColor = myDoc.swatches.item(selected_swatch.selectedIndex);
		
	} 
	catch (e) {
	
	}
	
	
	try {
		myChars.fillColor = myDoc.swatches.item(selected_swatch.selectedIndex);
		
	} 
	catch (e) {
	
	}
	
	try {
		myImg.fillColor = myDoc.swatches.item(selected_swatch.selectedIndex);
		
	} 
	catch (e) {
	
	}
	
}



*/


alert("done");

 
 