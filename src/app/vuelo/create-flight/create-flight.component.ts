import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TokenService} from "../../services/token.service";
import {FlightService} from "../../services/flight.service";
import {ItineraryService} from "../../services/itinerary.service";
import {AlertService} from "../../services/alert/alert.service";

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

  loading = false;

  constructor(private router: Router,
              private service: FlightService,
              private itineraryService: ItineraryService,
              private snackBar: MatSnackBar,
              private alertService: AlertService,
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

    this.loading = true;

    this.service.createFlight(formData).subscribe(
      response => {
        console.log('Vuelo creado:', response);
        if (response.status === 'SUCCESS') {

          this.alertService.notification('Creado !', 'success'); // Muestra una notificación de éxito
          this.dialogRef.close(3);

          this.loading = false; // Restablece el estado de carga a false

        } else {
          console.error('Error creating Vuelo:', response.message);
          this.alertService.notification('Error ! ', 'error'); // Muestra una notificación de error

          this.loading = false; // Restablece el estado de carga a false
        }
      },
      (error) => {
        console.log('Error creating Vuelo:', error);
        this.loading = false; // Restablece el estado de carga a false
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
