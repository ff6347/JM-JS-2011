//ComplexUI.jsx
//An InDesign CS4 JavaScript
//
//Shows how to create a more complex dialog box.


//main();
//function main(){
//	var myDoc = app.activeDocument;
//	var myList = myDoc.pages.everyItem().name;
//	var myPage;
//	var myPageName;
//
//    myUI(myDoc ,myPage ,myList );
//    alert(myPage.name);
//}
//function mySetup(){
//}
//
//function myUI(myDoc, myPage, myList){
//	var myNumOItems;
//
//    //<fragment>
//	var myDialog = app.dialogs.add({name:"XML Importer", canCancel:true});
//	with(myDialog){
//		//Add a dialog column.
//		with(dialogColumns.add()){
//			//Create a border panel.
//
//			//Create another border panel.
//			with(borderPanels.add()){
//				with(dialogColumns.add()){
//					staticTexts.add({staticLabel:" There are "+myNumOItems+" items to process"});
//				}
//
//			}
//			//Create another border panel.
//			with(borderPanels.add()){
//				with(dialogColumns.add()){
//					staticTexts.add({staticLabel:"Chose page to place"});
//				}	
//				with(dialogColumns.add()){
//					//Create a pop-up menu ("dropdown") control.
//					var myPageDropdown = dropdowns.add({
//						stringList:myList,
//						selectedIndex:0});
//				}
//				var myAddPage = checkboxControls.add({
//					staticLabel: "or create a new page",
////				checkedState: true	
//				});
//			}
//			//Create another border panel.
//			with(borderPanels.add()){
//				
//				var myFocusCheckBox = checkboxControls.add({
//					staticLabel: "place focus",
//				checkedState: true	
//				});
//				var myNormalCheckBox = checkboxControls.add({
//					staticLabel: "place normal",
//					checkedState: true	
//				});
//				var mySmallCheckBox = checkboxControls.add({
//					staticLabel: "place small",
//					checkedState: true	
//				});
//
//				}
//				
//			}
//		}
//	
//	//Display the dialog box.
//	if(myDialog.show() == true){
//		var myParagraphAlignment, myPointSize, myVerticalJustification;
//
//
////		//Get the vertical justification setting from the pop-up menu.
////		if(myPageDropdown.selectedIndex == 0){
////			myVerticalJustification = VerticalJustification.topAlign;	
////		}
//		
////		var myPage;
////		var myPageName;
//		
//		if(myAddPage.checkedState==true){
//			myPage = myDoc.pages.add();
//			myPageName = myPage.name;
//		}else {
//
//			myPage = myList[myPageDropdown.selectedIndex];
//			myPageName =  myList[myPageDropdown.selectedIndex];
//			
//		}
//		
//		
//
//
//		myDialog.destroy();
//		//here has to come the xml processing
//		placeItems(myDoc,myPage);
//
//		
//		
//		
//	}
//	else{
//		myDialog.destroy();
//		alert("all that thinking for nothing? Better luck nexttime!");
//		
//	}
//}

