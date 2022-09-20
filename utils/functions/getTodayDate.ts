export type todayDataType = {
  year: number
  month: number
  date: number
  day: string
  todayDateObject: Date
}

export function getTodayDate(version: string = 'ko'): todayDataType {
  const today = new Date()

  const year = today.getFullYear().toString().slice(2,4)
  const month = (today.getMonth() + 1).toString().padStart(2, '0')  // Month는 0부터 시작
  const date = today.getDate().toString().padStart(2, '0')
  const day = today.getDay()

  let dayStr = ''
  if (version === 'en') {
    switch (day) {
      case 0:
        dayStr = 'Sun'
        break
      case 1:
        dayStr = 'Mon'
        break
      case 2:
        dayStr = 'Tue'
        break
      case 3:
        dayStr = 'Wed'
        break
      case 4:
        dayStr = 'Thu'
        break
      case 5:
        dayStr = 'Fri'
        break
      case 6:
        dayStr = 'Sat'
        break
    }
  } else {
    switch (day) {
      case 0:
        dayStr = '(일)'
        break
      case 1:
        dayStr = '(월)'
        break
      case 2:
        dayStr = '(화)'
        break
      case 3:
        dayStr = '(수)'
        break
      case 4:
        dayStr = '(목)'
        break
      case 5:
        dayStr = '(금)'
        break
      case 6:
        dayStr = '(토)'
        break
    }
  }



  return { year: parseInt(year), month: parseInt(month), date: parseInt(date), day: dayStr, todayDateObject: today }
}