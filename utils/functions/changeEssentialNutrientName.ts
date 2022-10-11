import { Essential14Nutrients } from '../constants'

export function changeEssentialNutrientName(nutrientName: Essential14Nutrients): string {
  switch (nutrientName) {
    case '비타민C':
      return 'C'
    case '비타민D':
      return 'D'
    case '비타민B1':
      return 'B1'
    case '비타민B2':
      return 'B2'
    case '나이아신(B3)':
      return 'B3'
    case '판토텐산(B5)':
      return 'B5'
    case '비타민B6':
      return 'B6'
    case '비오틴':
      return 'B7'
    case '엽산':
      return 'B9'
    case '비타민B12':
      return 'B12'
    case '오메가3(EPA+DHA)':
      return 'o-3'
    case '마그네슘':
      return 'Mg'
    case '칼슘':
      return 'Ca'
    case '프로바이오틱스(유산균)':
      return 'bio'
  }
}