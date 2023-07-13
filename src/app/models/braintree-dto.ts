export class BraintreeDto {
  nonce: string;
  amount: number;
  constructor(nonce: string, amount: number) {
    this.nonce = nonce;
    this.amount = amount;
  }

}
