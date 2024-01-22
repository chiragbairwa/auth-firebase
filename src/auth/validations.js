export function containsCapital (str) {
  return str.match('[A-Z]') ? true : false
}

export function containsNumber (str) {
  return str.match('[0-9]') ? true : false
}

export function containsLower (str) {
  return str.match('[a-z]') ? true : false
}

export function validLength (str) {
  return str.match('.{6,30}$') ? true : false
}