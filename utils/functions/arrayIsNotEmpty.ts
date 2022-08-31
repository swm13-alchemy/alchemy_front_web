export function arrayIsNotEmpty(arr: any) {
  if (!Array.isArray(arr)) {
    return false;
  }
  return arr.length > 0;
}