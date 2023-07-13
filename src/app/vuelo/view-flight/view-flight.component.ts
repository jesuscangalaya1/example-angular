import {Component, OnInit} from '@angular/core';
import {FlightService} from "../../services/flight.service";
import {ItineraryService} from "../../services/itinerary.service";
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-view-flight',
  templateUrl: './view-flight.component.html',
  styleUrls: ['./view-flight.component.scss']
})
export class ViewFlightComponent implements OnInit{

  file: any;

  isLogged = false;
  isAdmin = false;

  constructor(
    private flightService: FlightService,
    private itineraryService: ItineraryService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.isLogged = this.tokenService.isLogged();
    this.isAdmin = this.tokenService.isAdmin();
 }

  selectedFile(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  uploadFile() {
    this.itineraryService.importExcel(this.file).subscribe(
      (data) => {
        console.log(data);
        alert(data.message);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onLogOut(): void {
    this.tokenService.logOut();
  }


}
