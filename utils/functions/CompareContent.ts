export class CompareContent {
  content: number
  reqMin: number
  reqAvg: number
  reqMax: number
  constructor(content: number, reqMin: number, reqAvg: number, reqMax: number) {
    this.content = content
    this.reqMin = reqMin
    this.reqAvg = reqAvg
    this.reqMax = reqMax
  }

  compareWithMax(): boolean {
    if (this.reqMax === 0) return false // reqMax 값이 0인 경우 (상한량 없음 의미) 초과가 되지 않게 false로 처리
    return this.content > this.reqMax
  }

  compareWithAvgAndMax(): boolean {
    if (this.reqMax === 0) return this.reqAvg <= this.content // reqMax 값이 0인 경우 처리
    return this.reqAvg <= this.content && this.content <= this.reqMax
  }

  compareWithMinAndAvg(): boolean {
    return this.reqMin <= this.content && this.content < this.reqAvg
  }
}