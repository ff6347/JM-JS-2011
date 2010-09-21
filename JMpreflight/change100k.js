/*
 @author fabianmoronzirfas
 // use the find change to change colors
 // you need this xmlFile change_100K_To_MixedK.xml :
 <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Query>
<Header>
<Version major="5" minor="1">
</Version>
<Application value="Adobe InDesign">
</Application>
<QueryType value="Object" qid="3">
</QueryType>
</Header>
<Description>
<ObjectType value="0">
</ObjectType>
<FindChangeOptions>
<IncludeLockedLayers value="1">
</IncludeLockedLayers>
<IncludeLockedStories value="0">
</IncludeLockedStories>
<IncludeMasterPages value="1">
</IncludeMasterPages>
<IncludeHiddenLayers value="1">
</IncludeHiddenLayers>
<IncludeFootnotes value="1">
</IncludeFootnotes>
</FindChangeOptions>
<FindFormatSettings>
<GraphicsAttribute cls_id="28264" value="Black">
</GraphicsAttribute>
</FindFormatSettings>
<ReplaceFormatSettings>
<GraphicsAttribute cls_id="28264" value="Master_buntschwarz">
</GraphicsAttribute>
</ReplaceFormatSettings>
</Description>
</Query>

*/



main();
//--------------


function main() {

	var myDoc = app.activeDocument;
	
	myDoc.layers.everyItem().locked = false;

	var myDate = new Date();
		var myLogFile = myGetFileName();
	var myFileContent = myLogFile.read();
	var myErrorLog = myFileContent +"\n"+"Starting Log file at "+myDate +"\n";
	
	var myColor;
	
try {
		 myColor = app.activeDocument.colors.add({name:"Master_buntschwarz",model:ColorModel.process, colorValue:[50, 50, 50, 100]});

} catch (e) {
		myErrorLog = myErrorLog + e.toString() + " There is a Problem with the Color: Master_buntschwarz \n";
				var myFile = myLogFile;   
		var myData = myErrorLog;
		writeData (myFile, myData );

}



	
	

try {
	app.loadFindChangeQuery ('change_100K_To_MixedK', SearchModes.objectSearch); 
	myErrorLog = myErrorLog +  myDoc.findObject().toString() +"\n";
	app.activeDocument.changeObject(); 

} catch (e) {

	myErrorLog = myErrorLog + e.toString() + " change_100K_To_MixedK.xml could not be processed  \n";

	
}

// -------
// from here on it is looking for all bmps in the doc and changes the black to another color
	var myRects = myDoc.rectangles.everyItem();
	
	for (var i=0; i< myDoc.rectangles.length ; i++) {
		
try {
		if (myDoc.rectangles.item(i).images.item(0).fillColor == myDoc.swatches.item(2)) {
		
		
		
			myDoc.rectangles.item(i).images.item(0).fillColor = myDoc.swatches.item("Master_buntschwarz");
		}

} catch (e) {
	
}

		}
		
	

	



		var myFile = myLogFile;   
		var myData = myErrorLog;
		writeData(myFile, myData );
		myDoc.layers.everyItem().locked = true;
		alert("Done and Locked all layers");
}


function myGetFileName(){   

	var myFolder = app.activeDocument.filePath;

      var myFile =  new File( myFolder+'/findChangeObjectLog.txt' )  
//      if ( myFile == null ){exit()};  
   return myFile;   
} 

function writeData(myFile, aData){
	var myResult;
	if (myFile != '') {
		//Open the file for writing.   
		myResult = myFile.open('e', undefined, undefined);
	}
	if (myResult != false) {
		myFile.seek(0);
		myFile.writeln(aData);
		myFile.close();
		//      myFile.execute();  
	}
}
   
   
