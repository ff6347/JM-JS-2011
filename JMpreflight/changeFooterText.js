/*
 @author fabianmoronzirfas
 // use the find change to change the footer
 // you need this xmlFile changeFooter_v01.xml :
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Query>
<Header>
<Version major="5" minor="1">
</Version>
<Application value="Adobe InDesign">
</Application>
<QueryType value="Text" qid="0">
</QueryType>
</Header>
<Description>
<FindString value="Alle Preise sind Tagespreise inkl. gesetzlicher MwSt.^pund freibleibend. Stand 19.10.2009">
</FindString>
<ReplaceString value="Alle Preise sind Tagespreise inkl. gesetzlicher MwSt.^pund freibleibend. Stand 21.09.2010">
</ReplaceString>
<FindChangeOptions>
<IncludeLockedLayers value="1">
</IncludeLockedLayers>
<IncludeLockedStories value="1">
</IncludeLockedStories>
<IncludeMasterPages value="1">
</IncludeMasterPages>
<IncludeHiddenLayers value="1">
</IncludeHiddenLayers>
<IncludeFootnotes value="1">
</IncludeFootnotes>
<CaseSensitive value="1">
</CaseSensitive>
<EntireWord value="0">
</EntireWord>
<KanaSensitive value="1">
</KanaSensitive>
<WidthSensitive value="1">
</WidthSensitive>
</FindChangeOptions>
<FindFormatSettings>
</FindFormatSettings>
<ReplaceFormatSettings>
<TextAttribute type="changecondmode" value="0">
</TextAttribute>
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


try {
	app.loadFindChangeQuery ('changeFooter_v01', SearchModes.textSearch); 
myErrorLog = myErrorLog +  myDoc.findGrep().toString() +"\n";
app.activeDocument.changeText(); 

} catch (e) {

	myErrorLog = myErrorLog + e.toString() + " changeFooter_v01.xml could not be processed  \n";
	
	
}	
		var myFile = myLogFile;   
		var myData = myErrorLog;
		writeData(myFile, myData );
		myDoc.layers.everyItem().locked = true;
		alert("Done and Locked all layers");
}


function myGetFileName(){   

	var myFolder = app.activeDocument.filePath;

      var myFile =  new File( myFolder+'/findChangeTextLog.txt' )  
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
   
   
