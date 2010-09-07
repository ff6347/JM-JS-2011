/*
  @author fabianmoronzirfas
 */

var myDoc = app.activeDocument;

for (var i = 0; i < app.selection.length; i++) {

	/*
	 try {
	 var myTs = app.selection[i].textFrames.everyItem();
	 
	 }
	 catch (e) {
	 
	 }
	 */
	if (app.selection[i] instanceof TextFrame) {
	
		if (app.selection[i].hasOwnProperty("nonprinting")) {
		
			if (app.selection[i].nonprinting == true) { 
			
				app.selection[i].remove();
				
			}
			
		}
		
	}
} 

alert("done");
 