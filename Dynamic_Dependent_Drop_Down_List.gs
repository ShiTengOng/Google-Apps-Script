 var mainWsName = "Data";
 var sourceWsName = "Sector";
 var firstLevelColumn = 56;
 var secondLevelColumn = 57;
 var thirdLevelColumn = 58;
 var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(mainWsName);
var wsOptions = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sourceWsName);

var options= wsOptions.getRange(2,1,wsOptions.getLastRow()-1,3).getValues();
 
function onEdit(activeCell){
  var activeCell = ws.getActiveCell();
  var val= activeCell.getValue();
  var r=activeCell.getRow();
  var c =activeCell.getColumn();
  var wsName= activeCell.getSheet().getName();
  if (wsName === mainWsName && c === firstLevelColumn && r > 1){
applyFirstLevelValidation(val,r);
} else if(wsName === mainWsName && c === secondLevelColumn && r > 1){}
applySecondLevelValidation(val,r);

}

function applyFirstLevelValidation(val,r){
  
  if (val === ""){
  ws.getRange(r,secondLevelColumn).clearContent();
  ws.getRange(r,secondLevelColumn).clearDataValidations();
 
}else{
ws.getRange(r,secondLevelColumn).clearContent();
  var filterOptions=  options.filter(function(o){return o[0]=== val});
  var listToApply = filterOptions.map(function(o){return o[1]});

var cell = ws.getRange(r,secondLevelColumn);
  applyValidationToCell(listToApply,cell);}
}

function applySecondLevelValidation(val,r){
  
  if (val === ""){
  ws.getRange(r,thirdLevelColumn).clearContent();
  ws.getRange(r,thirdLevelColumn).clearDataValidations();
 
}else{
ws.getRange(r,thirdLevelColumn).clearContent();
var firstLevelColValue= ws.getRange( r,firstLevelColumn).getValue();
  var filterOptions=  options.filter(function(o){return o[0]=== firstLevelColValue && o[1] === val});
  var listToApply = filterOptions.map(function(o){return o[2]});
  
var cell = ws.getRange(r,thirdLevelColumn);
  applyValidationToCell(listToApply,cell);}
}

function applyValidationToCell(list,cell) {

  var rule=SpreadsheetApp
  .newDataValidation()
  .requireValueInList(list)
  .setAllowInvalid(false)
  .build();
  
  cell.setDataValidation(rule);
}
