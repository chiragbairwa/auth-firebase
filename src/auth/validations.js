function containsCapital(str){
  return str.match("[A-Z]") ? true : false;
}

function containsNumber(str){
  return str.match("[0-9]") ? true : false;
}

function containsLower(str){
  return str.match("[a-z]") ? true : false;
}

function validLength(str){
  return str.match(".{6,30}$") ? true : false;
}

export {containsCapital, containsNumber, containsLower ,validLength}