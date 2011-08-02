/*
written by fabiantheblind 4 JM-2011
*/


main();
function main() {

	var myDoc = app.activeDocument;
	var myList;
	var myPageName;
	var myPage;
	myList = myDoc.pages.everyItem().name;
	myUI(myDoc, myPage,myPageName, myList);



}


function makeNumbers(myDoc,myPage,theNumber){
		var mySuperGroup = new Array;
		var myNumbers = new Array;
	myNumbers = ["1","2","3","4","5","6","7","8","9","0","§","q","w","e","r","t","z","u","i","o","p","a","s","d","f","g","h","j","k","l"];
	
	var myRY1 = 10+ 0.214;
	var myRX1 = 10 + 2.586 ;
	var myRY2 = myRY1 + 2.5;
	var myRX2 = myRX1 + 2.5;
	
	var myTFY1 = 10;
	var myTFX1 = 10;
	var myTFY2 = myTFY1 + 4.515;
	var myTFX2 = myTFX1 + 7.625;
	var theValue = 5;
	var theRow;
	var theItemCounter = 0;

	
	for(var i = 0; i < theNumber + 1; i++ ){
		
		if(theItemCounter < 10){
			theRow = 0;
			
		}else if(theItemCounter > 9 && theItemCounter < 20){
			theRow = 5;	
		}else {
			theRow = 10;
			
		}
		
		if(theItemCounter%10 == 0){
			theValue = 5;
			
		}
		
		
			var myGroup = new Array;
		var myRect =  myPage.rectangles.add();
		myRect.applyObjectStyle( myDoc.objectStyles.item(0));
			with(myRect){
				geometricBounds = [myRY1 + theRow , myRX1 + theValue, myRY2 + theRow ,myRX2 + theValue];
				fillColor = myDoc.swatches.item(2);
				
			}
			
			
			myGroup.push(myRect);

			var myTF =  myPage.textFrames.add();
			myTF.applyObjectStyle( myDoc.objectStyles.item(0));
			
			with(myTF){
				geometricBounds = [myTFY1+ theRow ,myTFX1 + theValue, myTFY2 + theRow ,myTFX2 + theValue];
				contents = myNumbers[i];
				try {
				paragraphs.everyItem().appliedParagraphStyle = myDoc.paragraphStyles.item("LAUFNUMMER_am_Bild"); 
				}catch(e){
					alert("the Paragraphstyle \"LAUFNUMMER_am_Bild\" doesnot exist.\nIwill try to build the numbers by hand");
					paragraphs.everyItem().pointSize = "12pt";
					paragraphs.everyItem().justification = Justification.CENTER_ALIGN;
					
					paragraphs.everyItem().fillColor = myDoc.swatches.item(1);
					
					
				}
				
				try{
					
					paragraphs.everyItem().appliedFont = "JM Bertram Symbol";
					
				}catch(e){
					
					alert("Sorry the Font \"JM Bertram Symbol\" does not exist. Sry");
				}
				
				
				theValue = theValue + 5;
			}
					myGroup.push(myTF);
			var myMetaGroup = myPage.groups.add(myGroup);
			mySuperGroup.push(myMetaGroup);
	theItemCounter++;
	}
	
	myPage.groups.add(mySuperGroup);


	
	
}


function myUI(myDoc, myPage,myPageName, myList){
	var myNumOItems = 0;

	
	var myDialog = app.dialogs.add({name:"MAKE NUMBERS", canCancel:true});
	with(myDialog){
		//Add a dialog column.
		with(dialogColumns.add()){
			//Create a border panel.



	
				var itemSelector = enablingGroups.add({staticLabel: "how many numbers do you need? ",
				 checkedState: true,minWidth :250});
			with(itemSelector){
				with(dialogColumns.add()){
					//Create a pop-up menu ("dropdown") control.
					var myNumberDropdown = dropdowns.add({

						stringList: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16",
						"17","18","19","20","21","22","23","24","25","26","27","28","29","30"]
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

		//var preTheItem = myItemsList[myArtikelDropdown.selectedIndex];
		//var theItem = preTheItem.substring(4);
		var mySelectedNumber  =myNumberDropdown.selectedIndex;

		myDialog.destroy();
		
 		myPage = myDoc.pages.item(myPageName);
		
		//placeData(myDoc,myPage,theItem);
		makeNumbers(myDoc,myPage,mySelectedNumber);



	}else{
		
		myDialog.destroy();
		alert("all that thinking for nothing? Better luck nexttime!");
		
	}

	}	  
}