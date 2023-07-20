import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FlightService} from "../../services/flight.service";

@Component({
  selector: 'app-detail-flight',
  templateUrl: './detail-flight.component.html',
  styleUrls: ['./detail-flight.component.scss']
})
export class DetailFlightComponent implements OnInit{

  flightDto: any;

  loading = false;


  constructor(private service: FlightService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              public dialogRef: MatDialogRef<DetailFlightComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.flightDto = data.product;
  }

  ngOnInit() {
    this.loading = true;

    const id = this.data.id;
    this.service.getFlightById(id).subscribe(
      response => {
        console.log(response);
        if (response.status === 'SUCCESS' && response.data) {
          this.flightDto = response.data;

          this.loading = false;

        } else {
          console.error('Error: Respuesta inválida del servicio');
          this.volver();
          this.loading = false;

        }
      },
      error => {
        console.error(error);
        this.loading = false;

        this.volver();
      }
    );
  }

  cancel(): void {
    this.dialogRef.close(3);
  }

  volver(): void {
    this.router.navigate(['/flights']);
  }

}
