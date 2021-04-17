export class Money {
  
  static sum(value1: number, value2: number) : number {
    return Number((value1 + value2).toFixed(2));
  }

  static sub(value1: number, value2: number) : number {
    return Number((value1 - value2).toFixed(2));
  }

  static mult(value1: number, value2: number) : number {
    return Number((value1 * value2).toFixed(2));
  }
}