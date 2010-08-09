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

	myList = myDoc.pages.everyItem().name;

	var myItemsListElement =  myDoc.xmlElements.item(0).xmlElements.item("itemsList");
	for (var i =0 ;i < myItemsListElement.xmlElements.length;i++){
		myItemsList[i] = myItemsListElement.xmlElements.item(i).markupTag.name;	
	}
	
	myUI(myDoc, myPage,myPageName, myList,myItemsList);



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
	var myRuleSet = new Array(new placeImages(theItem, myPage, myDoc));
	with(myDoc){
	var elements = xmlElements;
	__processRuleSet(elements.everyItem(), myRuleSet);
	}
	
	
}

function placeImages(theItem, myPage, myDoc){
	this.name = "placeImages";
	this.xpath = "//artikel[@iArtikelNr='Art-Nr. "+theItem +"']";
	this.apply = function(myElement, myRuleProcessor){

	var myImages = myElement.xmlElements.item("images");
	var myGroup = new Array;


	for (var i = 0; i<myImages.xmlElements.length ; i++){
	
	
		var myImgFrame = myPage.rectangles.add();
		myImgFrame.appliedObjectStyle = myDoc.objectStyles.item(0);
	
	
				try{
						myImgFrame.geometricBounds = [10+(i*10),10,40+(i*10),40];

						var myString =  myImages.xmlElements.item(i).xmlAttributes.item(1).value;
						myImgFrame.place(File(checkOS(myString)));
						myImgFrame.fit(FitOptions.CENTER_CONTENT);
						myImgFrame.fit(FitOptions.PROPORTIONALLY);
						myGroup.push(myImgFrame);

				}catch(e){
//						alert("WARNING! \r THERE IS  AN IMAGE MISSING! " +e );
					
						myImgFrame.geometricBounds = [10+(i*10),10,40+(i*10),40];
						myImgFrame.fillColor = myDoc.swatches.item(2);
						myImgFrame.fillTint = 42;
						myGroup.push(myImgFrame);


					}


			}
			
		var myBG = myPage.rectangles.add();
		with(myBG){
		geometricBounds = [5,5,10,30];
		fillColor = myDoc.swatches.item(1);
	}
	
		var myTextFrame = myPage.textFrames.add();
	with(myTextFrame){
		geometricBounds = [5,5,10,30];
		if (myImages.xmlElements.length == 0) {
			contents = theItem + " has no images";	
		}
		else {
			contents = theItem;
		}

	}
	
		myTextFrame.paragraphs.everyItem().appliedParagraphStyle = myDoc.paragraphStyles.item("ERROR");
		myTextFrame.paragraphs.everyItem().characters.everyItem().appliedCharacterStyle = myDoc.characterStyles.item("ERROR");

		myGroup.push(myBG);
		myGroup.push(myTextFrame);

		
		myPage.groups.add(myGroup);


			
		};

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
	
	var myDialog = app.dialogs.add({name:"PLACE ALL IMAGES", canCancel:true});
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