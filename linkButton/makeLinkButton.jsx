/*
written by fabiantheblind 4 JM-2011
*/
#include "./meta/glue code.jsx";

main();
function main() {

	var myDoc = app.activeDocument;
	var myItemsList = new Array;
	var myList;
	var myPageName;
	var myPage;
	myDoc.paragraphStyles.item("ERROR").appliedFont = "Arial";

	myList = myDoc.pages.everyItem().name;

	var myItemsListElement =  myDoc.xmlElements.item(0).xmlElements.item("itemsList");
	for (var i =0 ;i < myItemsListElement.xmlElements.length;i++){
		myItemsList[i] = myItemsListElement.xmlElements.item(i).markupTag.name;	
	}
	
	myUI(myDoc, myPage,myPageName, myList,myItemsList);



}

function myGetColumns(myDocument, myPage){
	var myPageWidth = myDocument.documentPreferences.pageWidth;
	var myPageHeight = myDocument.documentPreferences.pageHeight
	var myPageColumnCount= myPage.marginPreferences.columnCount;
	var myPageColumnGutterWidth= myPage.marginPreferences.columnGutter;

	var myX1 = myPage.marginPreferences.left;
	var myY1 = myPage.marginPreferences.top;
	var myX2 = myX1
		+((myPageWidth-myPage.marginPreferences.left
		-myPage.marginPreferences.right
		-(myPageColumnGutterWidth* (myPageColumnCount-1))) /myPageColumnCount);
	var myY2 = myPageHeight - myPage.marginPreferences.bottom;
	return [myY1, myX1, myY2, myX2];
}

function myGetBounds(myDocument, myPage){
	var myPageWidth = myDocument.documentPreferences.pageWidth;
	var myPageHeight = myDocument.documentPreferences.pageHeight
	if(myPage.side == PageSideOptions.leftHand){
		var myX2 = myPage.marginPreferences.left;
		var myX1 = myPage.marginPreferences.right;
	}
	else{
		var myX1 = myPage.marginPreferences.left;
		var myX2 = myPage.marginPreferences.right;
	}
	var myY1 = myPage.marginPreferences.top;
	var myX2 = myPageWidth - myX2;
	var myY2 = myPageHeight - myPage.marginPreferences.bottom;
	return [myY1, myX1, myY2, myX2];
}


function placeData(myDoc , myPage , theItem){
	var myRuleSet = new Array(new makeButton(theItem, myPage, myDoc));
	with(myDoc){
	var elements = xmlElements;
	__processRuleSet(elements.everyItem(), myRuleSet);
	}
	
	
}


function makeButton(theItem, myPage, myDoc){
	this.name = "placeButtons";
	this.xpath = "//artikel[@iArtikelNr='Art-Nr. " + theItem + "']";
	this.apply = function(myElement, myRuleProcessor){
	
		var myGroup = new Array;
		var myNullObjStyle = myDoc.objectStyles.item(0);
		var myPriceObjStyle = myDoc.objectStyles.item("PREIS_schatten");

		var myTempBounds = new Array;
		myTempBounds = myGetColumns(myDoc, myPage);
		var myY1 = myTempBounds[0];
		var myX1 = myTempBounds[1];
		var myY2 = myTempBounds[2];
		var myX2 = myTempBounds[3];
		var myImages = myElement.xmlElements.item("images");

		
		
		var OY1 = 19;//myY1 + 7.5;
		var OX1 = 19.5;//myX1 + 7.5 ;
		var OY2 = OY1 + 30;
		var OX2 = OX1 + 30;
		var myOV01 = myPage.ovals.add();
		with (myOV01) {
			geometricBounds = [OY1, OX1 ,OY2 , OX2];
			applyObjectStyle(myNullObjStyle);	
		}


		try {

		var myString =  myImages.xmlElements.item(0).xmlAttributes.item(1).value;
		myOV01.place(File(checkOS(myString)));
		myOV01.fit(FitOptions.CENTER_CONTENT);

		} catch (e) {
		alert("there is no image available!");
		}
		myGroup.push(myOV01);
		
		
		
		var RY1 = myY1;
		var RX1 = myX1;
		var RY2 = RY1 + 53.166;
		var RX2 = RX1 + 84.279;
				
		var myRect01 = myPage.rectangles.add();
		with (myRect01) {
			geometricBounds = [RY1, RX1, RY2, RX2];
			applyObjectStyle(myNullObjStyle);
		}
		var myFile  = File.openDialog("Choose the File \"Button_Lupe_Hintergrund.bmp\"");
		myRect01.place(myFile);
		myRect01.fit(FitOptions.CENTER_CONTENT);
		//myRect01.fit(FitOptions.PROPORTIONALLY);
		myRect01.fit(FitOptions.FRAME_TO_CONTENT);

		myGroup.push(myRect01);
		

		
		
		
		var TY1 = 18.861;
		var TX1 = 32.217;
		var TY2 = 100;
		var TX2 = myX2*2;
		
		
		
		var myTF01 = myPage.textFrames.add();
		with (myTF01) {
			geometricBounds = [TY1, TX1, TY2, TX2];
			applyObjectStyle(myNullObjStyle);
			
		}
		
		//var myContentElement = myElement.xmlElements.add("buttontext");
		
		//myContentElement.insertTextAsContent("Dazu passt:\n", XMLElementPosition.elementStart);
		var myContentString = "Dazu passt:"+"\r"+
		myElement.xmlElements.item("artikelInformation").xmlElements.item("iHersteller").contents +"\r"+
		myElement.xmlElements.item("artikelInformation").xmlElements.item("iArtikelBezeichnung").contents +"\r"+
		myElement.xmlElements.item("artikelInformation").xmlElements.item("iArtikelBeschreibung").contents +"\r"+
		myElement.xmlElements.item("artikelInformation").xmlElements.item("iArtikelNr").contents +"\r"+
		"Dies und mehr findet Ihr auf Seite XXX";

		myTF01.contents = myContentString;

		
		myTF01.paragraphs.item(0).appliedParagraphStyle = myDoc.paragraphStyles.item("BUTTON_Headline");
		myTF01.paragraphs.item(1).appliedParagraphStyle = myDoc.paragraphStyles.item("BUTTON_Hersteller");
		myTF01.paragraphs.item(2).appliedParagraphStyle = myDoc.paragraphStyles.item("BUTTON_Bezeichnung");
		myTF01.paragraphs.item(3).appliedParagraphStyle = myDoc.paragraphStyles.item("BUTTON_Beschreibung");
		myTF01.paragraphs.item(4).appliedParagraphStyle = myDoc.paragraphStyles.item("BUTTON_Artikelnummer");
		myTF01.paragraphs.item(5).appliedParagraphStyle = myDoc.paragraphStyles.item("BUTTON_Unterzeile");
		myTF01.characters.everyItem().appliedCharacterStyle = myDoc.characterStyles.item(0);
		myTF01.texts.everyItem().clearOverrides(OverrideType.all);

		myTF01.fit(FitOptions.FRAME_TO_CONTENT);
		myGroup.push(myTF01);

		var myNewPriceElement = myElement.xmlElements.item("preis").duplicate();
		
		var PY1 = 42.411;
		var PX1 = 28.729 ;
		var PY2 = PY1 + 50;
		var PX2 =  PX1 + 50;
		
		var myPF01 = myPage.textFrames.add();
		with (myPF01) {
			geometricBounds = [PY1, PX1, PY2, PX2];
			applyObjectStyle(myPriceObjStyle);
			
		}
		myNewPriceElement.placeXML(myPF01);
		myNewPriceElement.untag();
		myPF01.paragraphs.item(0).appliedParagraphStyle = myDoc.paragraphStyles.item("PREIS_KLEIN");
		myPF01.fit(FitOptions.FRAME_TO_CONTENT);

		
		
		myGroup.push(myPF01);
		
		
		myPage.groups.add(myGroup);
		
		
	}
	
}


/*
 * a function to check the operating system
 * 
 * @returns true if the OS is windows
 */
function checkOS(myString){
	var myOS = $.os;
	var myOSSubString = myOS.charAt(0);
	var myOSBoolean;
	if (myOSSubString == "w" || myOSSubString == "W") {
		myOSBoolean = true;
	}
	else {
		myOSBoolean = false;
	}

	if (myOSBoolean == true) {
		//this is for windows

		var myHREFString = myString;
		var myHREFSubString = myHREFString.substring(8);

		return myHREFSubString;
	
	} else {
		// this is for macintosh
		return myString;
	}

}
function myUI(myDoc, myPage,myPageName, myList,myItemsList){
	var myNumOItems = 0;
	
	var myDialog = app.dialogs.add({name:"MAKE BUTTON_LINK", canCancel:true});
	with(myDialog){
		//Add a dialog column.
		with(dialogColumns.add()){
			//Create a border panel.



	
				var itemSelector = enablingGroups.add({staticLabel: "place item ",
				 checkedState: true,minWidth :250});
			with(itemSelector){
				with(dialogColumns.add()){
					//Create a pop-up menu ("dropdown") control.
					var myArtikelDropdown = dropdowns.add({
						stringList: myItemsList
						//selectedIndex:0
						});
				}
				}
			
			//Create another border panel.
				var pageSelector = enablingGroups.add({
					staticLabel: "choose page",
					checkedState: true,
			
				});
				with (pageSelector) {
				
					with (dialogColumns.add()) {
						staticTexts.add({
							staticLabel: "chose page to place"
						});
					}
					with (dialogColumns.add()) {
						//Create a pop-up menu ("dropdown") control.
						var myPageDropdown = dropdowns.add({
							stringList: myList,
							selectedIndex: 0
						});
					}
//					var myAddPage = checkboxControls.add({
//						staticLabel: "or create a new page"
//					//				checkedState: true	
//					});
				}
			

			
		}
	
	//Display the dialog box.
	if(myDialog.show() == true){


//		var myPage;
//		var myPageName;
//		page selector box
		if(pageSelector.checkedState!=true ){
			myPage = myDoc.pages.add();
			myPageName = myPage.name;
		}else {
//			myPage = myList[myPageDropdown.selectedIndex];
			myPageName =  myList[myPageDropdown.selectedIndex];
		}

		var preTheItem = myItemsList[myArtikelDropdown.selectedIndex];
		var theItem = preTheItem.substring(4);

		myDialog.destroy();
		
 		myPage = myDoc.pages.item(myPageName);
		
		placeData(myDoc,myPage,theItem);



	}else{
		
		myDialog.destroy();
		alert("all that thinking for nothing? Better luck nexttime!");
		
	}

	}	  
}