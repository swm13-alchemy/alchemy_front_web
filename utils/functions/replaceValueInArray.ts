export function replaceValueInArray(arr: Array<any>, indexToReplace: number, valueToChange: any): Array<any> {
  const resultArr = [...arr] // 배열에서는 Spread 문법이 Deep Copy (1depth이므로)
  resultArr[indexToReplace] = valueToChange
  return resultArr
}