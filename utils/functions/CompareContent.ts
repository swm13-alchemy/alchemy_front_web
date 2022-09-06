export class CompareContent {
  content: number
  reqMin: number
  reqAvg: number
  reqLimit: number
  constructor(content: number, reqMin: number, reqAvg: number, reqLimit: number) {
    this.content = content
    this.reqMin = reqMin
    this.reqAvg = reqAvg
    this.reqLimit = reqLimit
  }

  compareWithLimit(): boolean {
    return this.content > this.reqLimit
  }

  compareWithAvgAndLimit(): boolean {
    return this.reqAvg <= this.content && this.content <= this.reqLimit
  }

  compareWithMinAndAvg(): boolean {
    return this.reqMin <= this.content && this.content < this.reqAvg
  }
}