import {Component, Inject, OnInit} from '@angular/core';
import {Product} from "../../models/Product";
import {PruebaProductService} from "../../services/prueba-product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FlightDto} from "../../models/flight-dto";
import {FlightService} from "../../services/flight.service";

@Component({
  selector: 'app-detail-flight',
  templateUrl: './detail-flight.component.html',
  styleUrls: ['./detail-flight.component.scss']
})
export class DetailFlightComponent implements OnInit{

  flightDto: FlightDto;

  constructor(private service: FlightService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.flightDto = data.product;
  }

  ngOnInit() {
    const id = this.data.id;
    this.service.getFlightById(id).subscribe(
      response => {
        console.log(response);
        if (response.status === 'SUCCESS' && response.data) {
          this.flightDto = response.data;
        } else {
          console.error('Error: Respuesta inválida del servicio');
          this.volver();
        }
      },
      error => {
        console.error(error);
        this.volver();
      }
    );
  }


  volver(): void {
    this.router.navigate(['/flights']);
  }

}
