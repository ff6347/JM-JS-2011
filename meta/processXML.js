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
	this.name = "getGroupData";
	this.xpath = "/Root/seite/group[@id ='"+count+"']/artikel[@iPrioritaet='fokus']";
	this.apply = function(myElement, myRuleProcessor){

		var myGroup = new Array;
		var myImages = myElement.xmlElements.item("images");
		for(var i = 0;i<myImages.xmlElements.length; i++){
		var myImgFrame = myPage.rectangles.add();
		myImgFrame.appliedObjectStyle = myDoc.objectStyles.item(0);

		myImgFrame.geometricBounds = myGetColumns(myDoc,myPage,itemCounter);
		myGroup.push(myImgFrame);
		}
		
		
		var myFrame = myPage.textFrames.add();
		myFrame.geometricBounds = myGetColumns(myDoc,myPage,itemCounter);
		var myTextContent = myElement.xmlElements.item("textPlatzieren");
		myTextContent.placeXML(myFrame);
		myGroup.push(myFrame);
		myPage.groups.add(myGroup);
		itemCounter++;
		alert("ItemCounter: " +itemCounter);
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

	var myX1 = myPage.marginPreferences.left;
	var myY1 = myPage.marginPreferences.top;
	var myX2 = myX1
		+((myPageWidth - myPage.marginPreferences.left
		-myPage.marginPreferences.right
		-(myPageColumnGutterWidth * (myPageColumnCount-1))) / myPageColumnCount);
	var myY2 = myPageHeight - myPage.marginPreferences.bottom;
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


