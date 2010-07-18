/**
 * @author fabiantheblind
 * 
 * 
 */
// You must copy the file "glue code.jsx" from the XML Rules folder (inside the
// Scripts
// folder inside your InDesign folder) to the folder containing this script, or
// provide a full
// path to the file in the next line.
#include "./meta/glue code.jsx";

main();
// ------------


function main(){
	
	var numOfItems;
	var myOS_is_Windows;
	try{
	 myOS_is_Windows = checkOS();
	 
	} catch (e){
		alert("ERROR: I dont know wich Operating System you are using\n"+ e );
		exit();
	}
	try {
		var myDoc = app.activeDocument;
	} catch (e) {
		
		alert("ERROR: you have no active Document!\n" + e);
		exit();
}

	// set the XMLImport preferences
		xmlImportPref(myDoc);

		var myRoot;
		try {
			myRoot = myDoc.importXML(File.openDialog("Choose your .xml file"));
		} catch (e) {
			alert("ERROR: :( Sorry, your XML Document seems broken.\n" + e);
			exit();
		}

		try{
			makeAttributesFromInfo(myDoc);
			
		}catch (e){
		alert("ERROR: No i could not make your Attributes for processing the xml" + e);
		exit();
		}

		try{
			makeGroupElements(myDoc);
		}catch(e){
			
			alert("ERROR: Could not make the Group elements" + e);
			exit();
		}
		
		try{
			for (var i = 1 ; i < 11 ;i++ ){
				sortToGroupsByAttributes(myDoc,i);
				}	
		}catch(e){
			alert("ERROR: Could not move Elements to group" + e);
			exit();
		}
		try{
// first we move the normal ones to the front
		sortInGroupByPriorityNormal(myDoc);
		}catch(e){
			
			alert("ERROR: Could not move the normal Elements in group" + e);
			exit();	
		}
		
		try{
// than we move the fokus to the front
			sortInGroupByPriorityFocus(myDoc);
			}catch(e){
				
				alert("ERROR: Could not move the fokus Elements in group" + e);
				exit();	
			}
			
// the klein artikel stay at the end

		


// -------------------------
// From here on it does something on the page
	var myPageName;
	var myPage;
	try{
		myPageName = myPageDialogUI(myDoc);
		myPage = myDoc.pages.item(myPageName);
	} catch(e){
		
		alert("ERROR: Sorry cant find the page u want\n "+e);
		exit();
	}
	var myFrame = myPage.textFrames.add();
	myFrame.geometricBounds = myGetColumns(myDoc,myPage);

	alert("Done");

}

/**
 * the pulldown dialog to choose the page to place the content to
 * 
 * @returns
 */
function myPageDialogUI(myDoc){
	var myList = myDoc.pages.everyItem().name;
	var myDialog = app.dialogs.add({name: "Choose the page to place your content",canCancel: true});
with (myDialog){
		// Add a dialog column.
		with (dialogColumns.add()){
			// Create a border panel.
			with (borderPanels.add()){
				with (dialogColumns.add()){
					// The following line shows how to set a property as you
					// create an object.
					staticTexts.add({staticLabel: "if you cancel I create a new page. Or I use the page named: "});
				}

				with(dialogColumns.add()){
				var myDropDown = dropdowns.add({
					stringList:myList,
					selectedIndex:0
			});	
				
				}
			}
		}
		if (myDialog.show() == true) {
			var myPage;
			// myTag = myDropDown.selectedIndex;
			myPage = myList[myDropDown.selectedIndex];
			myDialog.destroy();
			return myPage;
		}else {
			var myPage = myDoc.pages.add();
			myDialog.destroy();
			return myPage.name;
		}
	}
}

/**
 * a function to check the operating system
 * 
 * @returns true if the OS is windows
 */
function checkOS(){
	var myOS = $.os;
	var myOSSubString = myOS.charAt(0);
	var myOS_is_Windows;
	if (myOSSubString == "w" || myOSSubString == "W") {
		myOSIsWindows = true;
		return myOS_is_Windows;
	}
	else {
		myOSBoolean = false;
		return myOS_is_Windows;
	}
}

function processXML(myDoc){
}


/**
 * Set the xml import preferences
 */
function xmlImportPref(myDoc){
	
	myXMLImportPreferences = myDoc.xmlImportPreferences;
	myXMLImportPreferences.allowTransform = false;
	myXMLImportPreferences.createLinkToXML = false;
	myXMLImportPreferences.ignoreUnmatchedIncoming = false;
	myXMLImportPreferences.ignoreWhitespace = false;
	myXMLImportPreferences.importCALSTables = false;
	myXMLImportPreferences.importStyle = XMLImportStyles.mergeImport;
	myXMLImportPreferences.importTextIntoTables = false;
	myXMLImportPreferences.importToSelected = false;
	myXMLImportPreferences.removeUnmatchedExisting = false;
	myXMLImportPreferences.repeatTextElements = false;
}


/**
 * this makes attributes from the element artikelInformation
 * 
 * @param myDoc
 * @returns nothing
 */
function makeAttributesFromInfo(myDoc){

	var myRuleSet = new Array(new findInfoElement());
	with(myDoc){
	var elements = xmlElements;
	__processRuleSet(elements.everyItem(), myRuleSet);

	}
}
	
/**
 * this is the RuleSet for makeAttributesFromInfo
 * 
 * @returns nothing
 */
function findInfoElement(){
	this.name = "findInfoElement";
	this.xpath = "/Root/seite/artikel/artikelInformation";
	this.apply = function(myElement, myRuleProcessor){
		var myItem;
			for(var i = 0; i < myElement.xmlElements.length; i++){
				
			myItem= myElement.xmlElements.item(i);
			
			myElement.parent.xmlAttributes.add(myItem.markupTag.name, myItem.texts.item(0).contents);	
			}
		}

}
/**
 * 
 * @param myDoc
 * @returns nothing
 */
function sortInGroupByPriorityFocus(myDoc){

	var myRuleSet = new Array(new sortFocus());
	with(myDoc){
	var elements = xmlElements;
	__processRuleSet(elements.everyItem(), myRuleSet);

	}
	

}
	
/**
 * 
 * @returns nothing
 */
function sortFocus(){
	this.name = "sortFocus";
	this.xpath = "/Root/seite/group/artikel[@iPrioritaet ='fokus']";
	this.apply = function(myElement, myRuleProcessor){
		__skipChildren(myRuleProcessor);
		myElement.move(LocationOptions.before,myElement.parent.xmlElements.item(0));
		}

}
/**
 * 
 * @param myDoc
 * @returns nothing
 */
function sortInGroupByPriorityNormal(myDoc){	
	var myRuleSet = new Array(new sortNormal());
	with(myDoc){
	var elements = xmlElements;
	__processRuleSet(elements.everyItem(), myRuleSet);

	}
}
function sortNormal(){
	this.name = "sortNormal";
	this.xpath = "/Root/seite/group/artikel[@iPrioritaet ='normal']";
	this.apply = function(myElement, myRuleProcessor){
		__skipChildren(myRuleProcessor);
		myElement.move(LocationOptions.before,myElement.parent.xmlElements.item(0));
		}

}

/**
 * reorganizes the xmlStructure in element <seite> to groups
 * 
 * @param myDoc
 * @param count
 * @returns
 */
function sortToGroupsByAttributes(myDoc,count){

	var myRuleSet = new Array(new findGroupAttribute(count));
	with(myDoc){
	var elements = xmlElements;
	__processRuleSet(elements.everyItem(), myRuleSet);

	}
}

/**
 * moves the grouped items into a new xmlElement needed for
 * sortToGroupsByAttributes(myDoc,count) needs the for loop to process
 * 
 * @param count
 * @returns
 */
function findGroupAttribute(count){

	this.name = "findGroupAttribute";
	this.xpath = "/Root/seite/artikel[@iGruppenFarbe ='"+count+". Gruppenfarbe']";
	this.apply = function(myElement, myRuleProcessor){
		__skipChildren(myRuleProcessor);
		myElement.move(LocationOptions.UNKNOWN,myElement.parent.xmlElements.item(count));
		}
	
}

/**
 * this makes new elements for grouping all the <artikel> elements
 * 
 * @param myDoc
 * @returns
 */
function makeGroupElements(myDoc){
	var myRuleSet = new Array(new findPage());
	with(myDoc){
	var elements = xmlElements;
	__processRuleSet(elements.everyItem(), myRuleSet);
	}
}
/**
 * this is the function for makeGroupElements
 * 
 * @returns
 */
function findPage(){
	this.name = "findPage";
	this.xpath = "/Root/seite";
	this.apply = function(myElement, myRuleProcessor){
		
			for(var i = 10; i >= 0; i--){
			var myNewGroupElement = myElement.xmlElements.add("group");
			myNewGroupElement.xmlAttributes.add("id",i.toString());
			myNewGroupElement.move(LocationOptions.AT_BEGINNING,myElement);
			}
		}

}

/**
 * basic get columns needs an iterator
 */
function myGetColumns(myDoc, myPage){
	var myPageWidth = myDoc.documentPreferences.pageWidth;
	var myPageHeight = myDoc.documentPreferences.pageHeight
	var myPageColumnCount= myPage.marginPreferences.columnCount;
	var myPageColumnGutterWidth= myPage.marginPreferences.columnGutter;

	var myX1 = myPage.marginPreferences.left;
	var myY1 = myPage.marginPreferences.top;
	var myX2 = myX1
		+((myPageWidth - myPage.marginPreferences.left
		-myPage.marginPreferences.right
		-(myPageColumnGutterWidth * (myPageColumnCount-1))) / myPageColumnCount);
	var myY2 = myPageHeight - myPage.marginPreferences.bottom;
	return [myY1, myX1, myY2, myX2];
}