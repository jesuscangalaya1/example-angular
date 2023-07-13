import {Origins} from "./origins";
import {LocationsDto} from "./locations-dto";

export class Itinerary {

  id?: number;
  departureDate: string;
  arrivalDate: string;
  hour?: string;
  origin?: Origins;
  location?: LocationsDto
}
