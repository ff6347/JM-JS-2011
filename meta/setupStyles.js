/**
 * this is for having some parstyxles
 * 
 */
function makeParstylesArray(myDoc) {
	
	var myStyles = new Array();
	var myName;

	for(var count = 0 ;count < 13; count ++){
		try {
			myStyles[count] = myDoc.paragraphStyles.item("pSt" + count.toString());
			myName = myStyles[count].name;
		} catch (e) {
			//The style did not exist, so create it.
			myStyles[count] = myDoc.paragraphStyles.add( {
				name : "pSt" + count.toString()
			})
			with(myStyles[count]){
				appliedFont = "Arial";
				
			}
		}
	}
	return myStyles
}

function makeCharstylesArray(myDoc) {
	
	var myStyles = new Array();
	var myName;
	for(var count = 0 ;count < 13; count ++){
		try {
			myStyles[count] = myDoc.characterStyles.item("chSt" + count.toString());
			myName = myStyles[count].name;
		} catch (e) {
			//The style did not exist, so create it.
			myStyles[count] = myDoc.characterStyles.add( {
				name : "chSt" + count.toString()
			})
			with(myStyles[count]){
				appliedFont = "Arial";
				
			}
		}
	}
	return myStyles
}

function makeMetaStyle(myDoc){
	
	var myName;
	var myMetaStyle;
	var MetaParStyle;
	try {
		myMetaStyle = myDoc.characterStyles.item("ERROR");
		myName = myMetaStyle.name;
	} catch (e) {
		//The style did not exist, so create it.
		myMetaStyle = myDoc.characterStyles.add( {
			name : "ERROR"
		})
		with(myMetaStyle){
			appliedFont = "Geneva";
			pointSize = 8;
			
			
		}
	}
		
		try {
			MetaParStyle = myDoc.paragraphStyles.item("ERROR");
			myName = MetaParStyle.name;
		} catch (e) {
			//The style did not exist, so create it.
			MetaParStyle = myDoc.paragraphStyles.add( {
				name : "ERROR"
			})
			with(MetaParStyle){
				appliedFont = "Geneva";
				pointSize = 8;
				leading = 8;

				
				
			}
		
	
}
}