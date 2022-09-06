export function getTodayDate(): string {
  const today = new Date()

  const year = today.getFullYear().toString().slice(2,4)
  const month = (today.getMonth() + 1).toString().padStart(2, '0')  // Month는 0부터 시작
  const date = today.getDate().toString().padStart(2, '0')
  const day = today.getDay()

  let dayStr = ''
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

  return year + '.' + month + '.' + date + ` ${dayStr}`
}