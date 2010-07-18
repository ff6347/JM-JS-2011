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
#include "./meta/processXML.js";
#include "./meta/setupStyles.js";

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
		//Count all items in 
		numOfItems = countItems(myDoc);
		
//		alert("You have "+numOfItems+" Items");
		
		try{
			makeAttributesFromInfo(myDoc);
			
		}catch (e){
		alert("ERROR: No i could not make your Attributes for processing the xml" + e);
		exit();
		}

		
		try{
			sortGroups(myDoc);
			
		}catch(e){
			alert("ERROR: Could not move Elements to group" + e);
			exit();
		}
		try{
// first we move the normal ones to the front than the focus small stays at end
		sortInGroupByPriority(myDoc);
		}catch(e){
			
			alert("ERROR: Could not move the normal Elements in group" + e);
			exit();	
		}
		

			try{makeImgElement(myDoc);
			}catch (e){
				
				alert("ERROR: Could not move the image Elements into new Element group" + e);
				exit();	
			}


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
	var myParStyles = makeParstylesArray(myDoc);
	var myCharStyles = makeCharstylesArray(myDoc);
	
	
	placeItems(myDoc,myPage);
	
//	var myFrame = myPage.textFrames.add();
//	myFrame.geometricBounds = myGetColumns(myDoc,myPage);

	alert("Done");

}


function placeItems(myDoc,myPage){
	
	placeGroup(myDoc,myPage,2);
	

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

///**
// * basic get columns needs an iterator
// */
//function myGetColumns(myDoc, myPage){
//	var myPageWidth = myDoc.documentPreferences.pageWidth;
//	var myPageHeight = myDoc.documentPreferences.pageHeight
//	var myPageColumnCount= myPage.marginPreferences.columnCount;
//	var myPageColumnGutterWidth= myPage.marginPreferences.columnGutter;
//
//	var myX1 = myPage.marginPreferences.left;
//	var myY1 = myPage.marginPreferences.top;
//	var myX2 = myX1
//		+((myPageWidth - myPage.marginPreferences.left
//		-myPage.marginPreferences.right
//		-(myPageColumnGutterWidth * (myPageColumnCount-1))) / myPageColumnCount);
//	var myY2 = myPageHeight - myPage.marginPreferences.bottom;
//	return [myY1, myX1, myY2, myX2];
//}