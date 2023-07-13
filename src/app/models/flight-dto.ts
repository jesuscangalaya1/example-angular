import {Itinerary} from "./itinerary";

export class FlightDto {

  id?: number;
  capacity: number;
  duration: string;
  price: number;
  image: string;
  departureTime: string;
  itinerary?: Itinerary;
  itineraryId?: number;
}
