export function isEmpty(value) {
  return value.trim() === '';
}

export function isNotSevenCharLong(value) {
  return value.trim().length < 7;
}
