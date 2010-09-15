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


try {
	app.loadFindChangeQuery ('JM__ZOLL_HIN', SearchModes.grepSearch); 
myErrorLog = myErrorLog +  myDoc.findGrep().toString() +"\n";
app.activeDocument.changeGrep(); 

} catch (e) {

	myErrorLog = myErrorLog + e.toString() + " JM__ZOLL_HIN.xml could not be processed  \n";
	
	
}

try {
	app.loadFindChangeQuery ('JM__ANAB_01', SearchModes.grepSearch); 
myErrorLog = myErrorLog +  myDoc.findGrep().toString() +"\n";
app.activeDocument.changeGrep(); 

} catch (e) {

	myErrorLog = myErrorLog + e.toString() + " JM__ANAB_01.xml could not be processed  \n";
	
	
}


try {
	 
app.loadFindChangeQuery ('JM__ANAB_02', SearchModes.grepSearch); 
myErrorLog = myErrorLog +  myDoc.findGrep().toString() +"\n";
app.activeDocument.changeGrep(); 

} catch (e) {
	
		myErrorLog = myErrorLog + e.toString() + " JM__ANAB_02.xml could not be processed  \n";

	
}

try {
	app.loadFindChangeQuery ('JM__ZOLL_ZURUECK', SearchModes.grepSearch); 
myErrorLog = myErrorLog +  myDoc.findGrep().toString() +"\n";
app.activeDocument.changeGrep(); 

} catch (e) {

	myErrorLog = myErrorLog + e.toString() + " JM__ZOLL_ZURUECK.xml could not be processed  \n";
	
	
}


try {
	app.loadFindChangeQuery ('JM__EURO_hin', SearchModes.grepSearch); 
myErrorLog = myErrorLog +  myDoc.findGrep().toString() +"\n";
app.activeDocument.changeGrep(); 

} catch (e) {

	myErrorLog = myErrorLog + e.toString() + " JM__EURO_hin.xml could not be processed  \n";
	
	
}








try {
	app.loadFindChangeQuery ('JM__APOSTROPH', SearchModes.grepSearch); 
myErrorLog = myErrorLog +  myDoc.findGrep().toString() +"\n";
app.activeDocument.changeGrep();


} catch (e) {
		myErrorLog = myErrorLog + e.toString() + " JM__APOSTROPH.xml could not be processed  \n";

	
}

try {
	
app.loadFindChangeQuery ('JM__LEERZEICHEN_DOPPELTE', SearchModes.grepSearch); 
myErrorLog = myErrorLog +  myDoc.findGrep().toString() +"\n";
app.activeDocument.changeGrep();

} catch (e) {
		myErrorLog = myErrorLog + e.toString() + " JM__LEERZEICHEN_DOPPELTE.xml could not be processed  \n";

	
}

try {
	
app.loadFindChangeQuery ('JM__PUNKTBLANK', SearchModes.grepSearch); 
myErrorLog = myErrorLog +  myDoc.findGrep().toString() +"\n";
app.activeDocument.changeGrep();

} catch (e) {
		myErrorLog = myErrorLog + e.toString() + " JM__PUNKTBLANK.xml could not be processed  \n";

	
}

try {
	
app.loadFindChangeQuery ('JM__KOMMABLANK', SearchModes.grepSearch); 
myErrorLog = myErrorLog +  myDoc.findGrep().toString() +"\n";
app.activeDocument.changeGrep();

} catch (e) {
		myErrorLog = myErrorLog + e.toString() + " JM__KOMMABLANK.xml could not be processed  \n";

	
}



try {
	app.loadFindChangeQuery ('JM__MALZEICHEN', SearchModes.grepSearch); 
myErrorLog = myErrorLog +  myDoc.findGrep().toString() +"\n";
app.activeDocument.changeGrep();

} catch (e) {
		myErrorLog = myErrorLog + e.toString() + " JM__MALZEICHEN.xml could not be processed  \n";

	
}

try {
	
app.loadFindChangeQuery ('JM__EURO_zurueck', SearchModes.grepSearch); 

myErrorLog = myErrorLog +  myDoc.findGrep().toString() +"\n";
app.activeDocument.changeGrep();


} catch (e) {
		myErrorLog = myErrorLog + e.toString() + " JM__EURO_zurueck.xml could not be processed  \n";

	
}

try {
	
app.loadFindChangeQuery ('JM__PREISSTRICH', SearchModes.grepSearch); 

myErrorLog = myErrorLog +  myDoc.findGrep().toString() +"\n";
app.activeDocument.changeGrep();


} catch (e) {
		myErrorLog = myErrorLog + e.toString() + " JM__PREISSTRICH.xml could not be processed  \n";

	
}

try {
	

app.loadFindChangeQuery ('JM__ZOLLZEICHEN', SearchModes.grepSearch); 
myErrorLog = myErrorLog +  myDoc.findGrep().toString() +"\n";
app.activeDocument.changeGrep();
} catch (e) {
		myErrorLog = myErrorLog + e.toString() + " JM__ZOLLZEICHEN.xml could not be processed  \n";
		

	
}

try {
	

app.loadFindChangeQuery ('JM__INTERPUNKTION', SearchModes.grepSearch); 
myErrorLog = myErrorLog +  myDoc.findGrep().toString() +"\n";
app.activeDocument.changeGrep();
} catch (e) {
		myErrorLog = myErrorLog + e.toString() + " JM__INTERPUNKTION.xml could not be processed  \n";
		

	
}




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

