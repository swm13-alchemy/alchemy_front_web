import dayjs from 'dayjs'

export function getAgeRange(birth: string): string {
  const age: number = dayjs().get('year') - dayjs(birth).get('year') + 1

  const ageStr: string = age.toString()

  if (age >= 80) {
    return '80대 이상'
  } else if (age < 10) {
    return '영유아'
  } else {
    return ageStr[0] + 0 + '대'
  }
}