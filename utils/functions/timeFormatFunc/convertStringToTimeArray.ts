export function convertStringToTimeArray(timeStr: string, hourClock: number = 24): number[] {
  let result: number[] = []
  switch (hourClock) {
    case 24:  // ex. '09:00' -> [9,0]
      result = timeStr.split(':').map((numStr) => parseInt(numStr))
      break
    // 추후 필요하면 구현 ↓
    // case 12:
    //   break
  }
  return result
}