/*
 @author fabianmoronzirfas
*/

main();
//--------------

function main() {
	var myDoc = app.activeDocument;
	var myDate = new Date();
	var myLogFile = myGetFileName();
	var myFileContent = myLogFile.read();
	var myErrorLog = myFileContent +"\n"+"Starting Log file at "+myDate +"\n";


/*
try {
	app.loadFindChangeQuery ('mySpecsFinder', SearchModes.grepSearch); 
myErrorLog = myErrorLog +  myDoc.findGrep().toString() +"\n";
app.activeDocument.changeGrep(); 

} catch (e) {

	myErrorLog = myErrorLog + e.toString() + " mySpecsFinder.xml could not be processed  \n";
	
	
}
*/

	 //Clear the find/change grep preferences.
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    //Set the find options.
    app.findChangeGrepOptions.includeFootnotes = false;
    app.findChangeGrepOptions.includeHiddenLayers = false;
    app.findChangeGrepOptions.includeLockedLayersForFind = false;
    app.findChangeGrepOptions.includeLockedStoriesForFind = false;
    app.findChangeGrepOptions.includeMasterPages = false;
	app.findGrepPreferences.appliedParagraphStyle = myDoc.paragraphStyles.item("ARTIKEL_Text");;
    app.findGrepPreferences.findWhat = "~b<";
	app.changeGrepPreferences.changeTo = "<";
	
	for (var i = 0; i < app.selection.length; i++) {
	
		try {
			var myPars = app.selection[i].paragraphs.everyItem();
			myPars.changeGrep();
			
		} 
		catch (e) {
		
		}
	}
    //myDoc.changeGrep();
	
	
    //Clear the find/change preferences after the search.
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
	
	    app.findChangeGrepOptions.includeFootnotes = false;
    app.findChangeGrepOptions.includeHiddenLayers = false;
    app.findChangeGrepOptions.includeLockedLayersForFind = false;
    app.findChangeGrepOptions.includeLockedStoriesForFind = false;
    app.findChangeGrepOptions.includeMasterPages = false;
	app.findGrepPreferences.appliedParagraphStyle = myDoc.paragraphStyles.item("ARTIKEL_Text");;
    app.findGrepPreferences.findWhat = "~b";
	app.changeGrepPreferences.changeTo = " ";
	for (var i = 0; i < app.selection.length; i++) {
	
		try {
			var myPars = app.selection[i].paragraphs.everyItem();
			myPars.changeGrep();
			
		} 
		catch (e) {
		
		}
	}
    //myDoc.changeGrep();    //Clear the find/change preferences after the search.
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;





		var myFile = myLogFile;   
		var myData = myErrorLog;
		writeData (myFile, myData );
		alert("Done");
}
function myGetFileName()  
{   

	var myFolder = app.activeDocument.filePath;

      var myFile =  new File( myFolder+'/findChangeLog.txt' )  
//      if ( myFile == null ){exit()};  
   return myFile;   
} 

function writeData (myFile , aData )  
{ 
	var myResult;
   if( myFile!='' )  
   {   
      //Open the file for writing.   
      myResult = myFile.open( 'e', undefined, undefined );   
   }  
   if( myResult != false )  
   {     
	   myFile.seek(0);
      myFile.writeln( aData );         
      myFile.close();   
//      myFile.execute();  
   }
}

