export function convertTimeArrayToStringArray(arrayOfTimeArrays: number[][], hourClock: number = 12): string[] {
  const resultList: string[] = []
  switch (hourClock) {
    case 12:
      for (const timeArray of arrayOfTimeArrays) {
        let timeStr: string = ''
        // 12:00을 넘어가는 시간대라면
        if (timeArray[0] >= 12) {
          // 딱 12:00이라면,
          if (timeArray[0] === 12) {
            timeStr = timeArray[0].toString().padStart(2, '0') + ':' + timeArray[1].toString().padStart(2, '0') + ' PM'
          } else {  // 12:00를 넘은 시간대
            timeStr = (timeArray[0] - 12).toString().padStart(2, '0') + ':' + timeArray[1].toString().padStart(2, '0') + ' PM'
          }
        } else {
          timeStr = timeArray[0].toString().padStart(2, '0') + ':' + timeArray[1].toString().padStart(2, '0') + ' AM'
        }
        resultList.push(timeStr)
      }
      break
    case 24:  // ex. [9,0] -> '09:00'
      for (const timeArray of arrayOfTimeArrays) {
        const timeStr: string = timeArray[0].toString().padStart(2, '0') + ':' + timeArray[1].toString().padStart(2, '0')
        resultList.push(timeStr)
      }
      break
  }
  return resultList
}