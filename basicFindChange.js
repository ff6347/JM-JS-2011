/*
 @author fabianmoronzirfas
*/
var myDoc = app.activeDocument;

app.loadFindChangeQuery ('JM__ANAB_01', SearchModes.grepSearch); 
app.activeDocument.changeGrep(); 
 
app.loadFindChangeQuery ('JM__ANAB_02', SearchModes.grepSearch); 
app.activeDocument.changeGrep(); 

app.loadFindChangeQuery ('JM__APOSTROPH', SearchModes.grepSearch); 
app.activeDocument.changeGrep();

app.loadFindChangeQuery ('JM__LEERZEICHEN_DOPPELTE', SearchModes.grepSearch); 
app.activeDocument.changeGrep();

app.loadFindChangeQuery ('JM__MALZEICHEN', SearchModes.grepSearch); 
app.activeDocument.changeGrep();

app.loadFindChangeQuery ('JM__PREISSTRICH', SearchModes.grepSearch); 
app.activeDocument.changeGrep();

app.loadFindChangeQuery ('JM__ZOLLZEICHEN', SearchModes.grepSearch); 
app.activeDocument.changeGrep();

alert("Done");


