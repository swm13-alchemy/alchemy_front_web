import { Days } from '../../types'

export function convertEnDayToKoDay(enDay: Days | string) {
  switch (enDay) {
    case 'Sun': return '월'
    case 'Mon': return '화'
    case 'Tue': return '수'
    case 'Wed': return '목'
    case 'Thu': return '금'
    case 'Fri': return '토'
    case 'Sat': return '일'
  }
}