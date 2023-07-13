import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FlightService} from "../../services/flight.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-update-flight',
  templateUrl: './update-flight.component.html',
  styleUrls: ['./update-flight.component.scss']
})
export class UpdateFlightComponent implements OnInit{

  id: number;
  url = environment.URL;

  capacidad: number;
  duracion: string;
  precio: number;
  horaSalida: string;
  imagen: any;
  itineraryId: number = 0;

  isAdmin = false;
  flightImage: any; // Variable para almacenar la imagen del vuelo

  flightImageURL: string;

  constructor(
    private service: FlightService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<UpdateFlightComponent>,
    @Inject(MAT_DIALOG_DATA)private data: any

  ) {
    this.id = data.id;
  }

  ngOnInit() {
    this.loadFlight()
    //this.flightImageURL = this.getFlightImageURL(this.id);

  }

  getFlightImageURL(flightId: number): string {
    return `${this.url}flights/image/${flightId}`;
  }

  updateFlight(): void {
    const formData = new FormData();
    formData.append('capacity', this.capacidad.toString());
    formData.append('duration', this.duracion);
    formData.append('price', this.precio.toString());
    formData.append('departureTime', this.horaSalida);
    formData.append('file', this.imagen);
    formData.append('itineraryId', this.itineraryId.toString()); // Agrega el itineraryId al FormData

    this.service.updateFlight(this.id,formData).subscribe(
      (response: any) => {
        console.log('Vuelo actualizado:', response);
        if (response.status === 'SUCCESS') {
          this.snackBar.open('Vuelo SUCCESSFULLY CREATED', '', { duration: 1000 });
          this.dialogRef.close('success');
        } else {
          console.error('Error updated Vuelo:', response.message);
        }
      },
      (error) => {
        console.log('Error updated Vuelo:', error);
      }
    );
  }

  private loadFlight(): void {
    this.service.getFlightById(this.id).subscribe(
      (response: any) => {
        console.log('Response:', response);
        if (response && response.data) {
          const flight = response.data;
          this.capacidad = flight.capacity;
          this.duracion = flight.duration;
          this.precio = flight.price;
          this.horaSalida = flight.departureTime;
          this.itineraryId = flight.itineraryId;
          this.flightImageURL = flight.image; // Asigna el nombre de la imagen existente

        } else {
          console.error('Error cargando Vuelo:', response && response.message);
        }
      },
      (error) => {
        console.log('Error cargando Vuelo:', error);
      }
    );
  }



  cancel(): void {
    this.dialogRef.close();
  }

// update-flight.component.ts
  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.imagen = event.target.files[0];
      this.flightImageURL = this.imagen.name;
    } else {
      this.flightImageURL = ''; // Establecer flightImageURL como una cadena vacía cuando no se selecciona un archivo
    }
  }


  formularioValido(): boolean {
    return this.capacidad && this.duracion && this.precio && this.horaSalida && this.imagen;
  }

}
