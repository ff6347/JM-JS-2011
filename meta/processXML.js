/*
 * written for JustMusic 2011
 *
 * @author fabiantheblind
 * 
 * 
 */


function processXML(myDoc){
}
function countItems(myRoot){
	
	var myElement = myRoot.xmlElements.item(0).xmlElements.everyItem();
	
	return myElement.xmlElements.length -2;
}

function placeGroup(myDoc,myPage,count){
	var itemCounter = 0;

	var myRuleSet = new Array(new getGroupsFocus(myDoc,myPage,count,itemCounter));
	with(myDoc){
	var elements = xmlElements;
	__processRuleSet(elements.everyItem(), myRuleSet);
	}



}

/*
 * this is the RuleSet for makeAttributesFromInfo
 * 
 * @returns nothing
 */
function getGroupsFocus(myDoc,myPage,count,itemCounter){
	
	var myFocusNum = myDoc.xmlElements.item(0).xmlElements.item(0).xmlElements.item(count).xmlElements.length;
	alert(myFocusNum);
//	var myNormalNum
	var myLine = 0;
	var myItemImgHeight = new Array;
	myItemImgHeight[0] = 30;
	myItemImgHeight[1] = 25;
	myItemImgHeight[2] = 20;
	myItemImgHeight[3] = 15;
	
	var myItemTxtHeight = new Array;
	myItemTxtHeight[0] = myItemImgHeight[0] + 20;
	myItemTxtHeight[1] = myItemImgHeight[1] + 20;
	myItemTxtHeight[2] = myItemImgHeight[2] = + 20;
	myItemTxtHeight[3] = myItemImgHeight[3] = + 20;
	
	var myLineHeight = new Array;
	
	myLineHeight[0] = myItemImgHeight[0] + myItemTxtHeight[0];
	
	
	
	this.name = "getGroupData";
	this.xpath = "//group[@id ='"+count+"']/artikel";//[@iPrioritaet='fokus']";
		this.apply = function(myElement, myRuleProcessor){
			var myColumnNum = myPage.marginPreferences.columnCount;
			var myLeftMargin = myPage.marginPreferences.columnCount;
			var myRightMargin= myPage.marginPreferences.columnCount;
			var myCGutterWidth = myPage.marginPreferences.columnGutter;
			var myPageWidth = myDoc.documentPreferences.pageWidth;
			
			var myOffset = myPageWidth - myLeftMargin*2 - myRightMargin*2 - myCGutterWidth*2  ;// - myCGutterWidth;
	
			var myGroup = new Array;

			var myImages = myElement.xmlElements.item("images");
			for(var i = 0;i< myImages.xmlElements.length; i++){
				
		
				var myImgFrame = myPage.rectangles.add();
				myImgFrame.appliedObjectStyle = myDoc.objectStyles.item(0);
		
				var myImgCount = myImages.xmlElements.length;
			
//				alert(myImgCount);
				var myIMGBounds = new Array;
				myIMGBounds = myGetColumns(myDoc,myPage,itemCounter);
				
				
				var tempY1 = (myIMGBounds[0] +(i*10))+(myLine*myLineHeight[0]);
				var tempX1 = myIMGBounds[1]-( myOffset*myLine);
				var tempY2 = tempY1 + myItemImgHeight[0] -(i*10);
				var tempX2 = myIMGBounds[3]-( myOffset*myLine);
				
				try{
				myImgFrame.geometricBounds = [tempY1,tempX1,tempY2,tempX2];// = myGetColumns(myDoc,myPage,itemCounter);
				}catch(e){
				myImgFrame.geometricBounds = [tempY1,tempX1,tempY1+10,tempX1+10];// = myGetColumns(myDoc,myPage,itemCounter);
				}
				myGroup.push(myImgFrame);
			}
			
			
			var myTextBounds = new Array;
			myTextBounds = myGetColumns(myDoc,myPage,itemCounter);
			var Y1 = myTextBounds[0] + myItemImgHeight[0] +(myLine*myLineHeight[0]);
			var X1 = myTextBounds[1]-( myOffset*myLine);
			var Y2 = Y1 + myItemTxtHeight[0];
			var X2 = myTextBounds[3]-( myOffset*myLine);
	
			var myFrame = myPage.textFrames.add();
			myFrame.geometricBounds = [Y1,X1,Y2,X2];//  myGetColumns(myDoc,myPage,itemCounter);
			var myTextContent = myElement.xmlElements.item("textPlatzieren");
			myTextContent.placeXML(myFrame);
			myGroup.push(myFrame);
			myPage.groups.add(myGroup);
			

			alert(myLine);
			itemCounter++;
			if(itemCounter%myColumnNum==0){
				myLine++;
				
					}
			
//			alert("this is the line " + myLine+" this is the item "+itemCounter);//+ " this is the column " + myColumnNum);

//			alert("ItemCounter: " +itemCounter);
		}

}


/*
 * basic get columns needs an iterator
 */
function myGetColumns(myDoc, myPage,itemCounter){

	
	
	var myPageWidth = myDoc.documentPreferences.pageWidth;
	var myPageHeight = myDoc.documentPreferences.pageHeight
	var myPageColumnCount= myPage.marginPreferences.columnCount;
	var myPageColumnGutterWidth= myPage.marginPreferences.columnGutter;
	var myTopMargin = myPage.marginPreferences.top;
	var myBottomMargin = myPage.marginPreferences.bottom;
	var myLeftMargin =  myPage.marginPreferences.left;
	var myRightMargin = myPage.marginPreferences.right;
	var myColumnsWidth = myPageWidth - myLeftMargin - myRightMargin - (myPageColumnGutterWidth *(myPageColumnCount-1));
	var myColumnWidth = myColumnsWidth / myPageColumnCount;
	
//	alert(" a column has :"+myColumnWidth + "mm");
	
	var myFocusHeight = (myPageHeight - myTopMargin - myBottomMargin)/2;
	var myNormalHeight = (myPageHeight - myTopMargin - myBottomMargin)/4;
	var mySmallHeight;

	if(myPageColumnCount == 3){
		
//		alert("there are 3 colums");
		
	}else if(myPageColumnCount==4){
		
		
	}
	
	
	if(itemCounter==0){
		var myX1 = myPage.marginPreferences.left;
	}else{
		var myX1 = myPage.marginPreferences.left + ((myColumnWidth*itemCounter)+(myPageColumnGutterWidth*(itemCounter)));
	}
	var myY1 = myPage.marginPreferences.top;
	var myX2 = myX1
		+((myPageWidth - myPage.marginPreferences.left
		-myPage.marginPreferences.right
		-(myPageColumnGutterWidth * (myPageColumnCount-1))) / myPageColumnCount);
	var myY2 = myPageHeight - myPage.marginPreferences.bottom;
	
//	alert("top "+myTopMargin+" Left "+myLeftMargin+" bottom "+myBottomMargin+" right "+myRightMargin);
//	return[myTopMargin,myLeftMargin,myBottomMargin,myRightMargin];
	return [myY1, myX1, myY2, myX2];
}


/*
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


/*
 * this makes attributes from the element artikelInformation
 * 
 * @param myDoc
 * @returns nothing
 */
function makeAttributesFromInfo(myDoc){

	var myRuleSet = new Array(new findInfoElement,new makeGroups);
	with(myDoc){
	var elements = xmlElements;
	__processRuleSet(elements.everyItem(), myRuleSet);

	}
}
	
/*
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

/*
 * this is the function for makeGroupElements
 * 
 * @returns
 */
function makeGroups(){
	this.name = "makeGroups";
	this.xpath = "/Root/seite";
	this.apply = function(myElement, myRuleProcessor){
		
			for(var i = 10; i >= 0; i--){
			var myNewGroupElement = myElement.xmlElements.add("group");
			myNewGroupElement.xmlAttributes.add("id",i.toString());
			myNewGroupElement.move(LocationOptions.AT_BEGINNING,myElement);
			}
		}
}
/*
 * 
 * @param myDoc
 * @returns nothing
 */
function sortInGroupByPriority(myDoc){

	var myRuleSet = new Array(new sortNormal);
	with(myDoc){
	var elements = xmlElements;
	__processRuleSet(elements.everyItem(), myRuleSet);
	}
	
	var myRuleSet = new Array(new sortFocus);
	with(myDoc){
	var elements = xmlElements;
	__processRuleSet(elements.everyItem(), myRuleSet);
	}
}
/*
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

function sortNormal(){
	this.name = "sortNormal";
	this.xpath = "/Root/seite/group/artikel[@iPrioritaet ='normal']";
	this.apply = function(myElement, myRuleProcessor){
		__skipChildren(myRuleProcessor);
		myElement.move(LocationOptions.before,myElement.parent.xmlElements.item(0));
		}

}


function sortGroups(myDoc){
	for (var i = 1 ; i < 11 ;i++ ){
	sortToGroupsByAttributes(myDoc,i);
	}
}
/*
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

/*
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


/*
 * this makes new elements for grouping all the <artikel> elements
 * 
 * @param myDoc
 * @returns
 */
function makeImgElement(myDoc){
	var myRuleSet = new Array(new makeImgContainer,new findMoveImages);
	with(myDoc){
	var elements = xmlElements;
	__processRuleSet(elements.everyItem(), myRuleSet);
	}
	
	
}
/*
 * this is the function for makeGroupElements
 * 
 * @returns
 */
function makeImgContainer(){
	this.name = "makeImgElement";
	this.xpath = "/Root/seite/group/artikel";
	this.apply = function(myElement, myRuleProcessor){
		var imgElement = myElement.parent.xmlElements.add("images");
		imgElement.move(LocationOptions.AT_BEGINNING,myElement);
			
		}

}
/*
 * this is the function for makeGroupElements
 * 
 * @returns
 */
function findMoveImages(){
	this.name = "findMoveImages";
	this.xpath = "/Root/seite/group/artikel/bild";
	this.apply = function(myElement, myRuleProcessor){
		__skipChildren(myRuleProcessor);
		var imgElement = myElement.parent.xmlElements.item("images");
		myElement.move(LocationOptions.AT_BEGINNING,imgElement);

		}
}


