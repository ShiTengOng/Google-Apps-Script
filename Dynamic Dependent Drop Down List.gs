var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
var wsSector = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sector");
var sector = wsSector.getRange(2,1, wsSector.getLastRow()-1,3).getValues();

function onEdit(activeCell){
  var activeCell = ws.getActiveCell();
  var val = activeCell.getValue();
  var r = activeCell.getRow();
  var c = activeCell.getColumn();
  var wsName = activeCell.getSheet().getName();
  if(wsName == "Data" && c === 57 && r > 1){
    var filteredSector = sector.filter(function(o){ return o[0] === val });
    var listToApply = filteredSector.map(function(o){ return o[1] })
    console.log(listToApply);
    var cell = ws.getRange(r,58);
    applyValidationToCell(listToApply,cell);
  }
}

function applyValidationToCell(list,cell){
  var rule = SpreadsheetApp
  .newDataValidation()
  .requireValueInList(list)
  .setAllowInvalid(false)
  .build();

  cell.setDataValidation(rule);
}
