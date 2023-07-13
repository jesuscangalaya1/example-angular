import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TokenService} from "../../services/token.service";
import {FlightService} from "../../services/flight.service";
import {ItineraryService} from "../../services/itinerary.service";

@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.scss']
})
export class CreateFlightComponent implements OnInit{

  capacidad: number;
  duracion: string;
  precio: number;
  horaSalida: string;
  imagen: any;
  itineraryId: 0;

  isAdmin = false;

  constructor(private router: Router,
              private service: FlightService,
              private itineraryService: ItineraryService,
              private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<CreateFlightComponent>,
              private tokenService: TokenService,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }


  ngOnInit() {
  }

  crearVuelo() {
    const formData = new FormData();
    formData.append('capacity', this.capacidad.toString());
    formData.append('duration', this.duracion);
    formData.append('price', this.precio.toString());
    formData.append('departureTime', this.horaSalida);
    formData.append('file', this.imagen);
    formData.append('itineraryId', this.itineraryId.toString()); // Agrega el itineraryId al FormData

    this.service.createFlight(formData).subscribe(
      response => {
        console.log('Vuelo creado:', response);
        if (response.status === 'SUCCESS') {
          this.snackBar.open('Vuelo SUCCESSFULLY CREATED', '', { duration: 2000 });
          this.dialogRef.close('success');
        } else {
          console.error('Error creating Vuelo:', response.message);
        }
      },
      (error) => {
        console.log('Error creating Vuelo:', error);
      }
    );
  }

  cancel(): void {
    this.dialogRef.close();
    this.isAdmin = this.tokenService.isAdmin();

  }

  onFileSelected(event: any) {
    this.imagen = event.target.files[0];
  }

  formularioValido(): boolean {
    return this.capacidad && this.duracion && this.precio && this.horaSalida && this.imagen;
  }



}
