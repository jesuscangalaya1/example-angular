import {FlightDto} from "./flight-dto";

export class PurchaseResponse {

  id?: number;
  amount: number;
  price: number;
  total?: number;
  purchaseDate?: any;

  flights: FlightDto[];
}
