import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';

import {LocationService} from "../../services/location.service";
import {debounceTime, map, startWith, switchMap} from "rxjs/operators";
import {LocationsDto} from "../../models/locations-dto";
import {FormControl} from "@angular/forms";
import {catchError, Observable, of, tap, throwError} from "rxjs";
import {Origins} from "../../models/origins";
import {DatePipe} from "@angular/common";
import {TokenService} from "../../services/token.service";
import {FlightService} from "../../services/flight.service";
import {FlightDto} from "../../models/flight-dto";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {CreateFlightComponent} from "../create-flight/create-flight.component";
import {DetailFlightComponent} from "../detail-flight/detail-flight.component";
import {environment} from "../../../environments/environment";
import {UpdateFlightComponent} from "../update-flight/update-flight.component";
import * as events from "events";

@Component({
  selector: 'app-list-flight',
  templateUrl: './list-flight.component.html',
  styleUrls: ['./list-flight.component.scss']
})
export class ListFlightComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  locationControl = new FormControl();
  filteredLocations: Observable<LocationsDto[]>;
  filteredOrigins: Observable<Origins[]>;
  fechaVueltaControl = new FormControl();
  fechaIdaControl = new FormControl();

  dataSource: MatTableDataSource<FlightDto>;
  displayedColumns: string[] = ['id', 'capacity', 'duration', 'price', 'departureTime','image','detail', 'update','deleted'];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25];
  totalElements = 0; // Inicializar en 0
  totalPages: number;
  lastPage: boolean;

  flights: FlightDto[] = [];
  priceMin: number | undefined;
  priceMax: number | undefined;
  isInputsValid = false; // Agrega una variable para controlar la validez de los inputs



  isLogged = false;
  isAdmin = false;
  flightUpdated: EventEmitter<any> = new EventEmitter<any>();


  constructor(
    private locationService: LocationService,
    private flightService: FlightService,
    private datePipe: DatePipe,
    private tokenService: TokenService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog


  ) {
    this.fechaIdaControl.valueChanges.subscribe(date => {
      const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
      console.log(formattedDate); // Aquí tienes la fecha en el formato deseado (ejemplo: "2023-06-14")
    });
    this.fechaVueltaControl.valueChanges.subscribe(date => {
      const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
      console.log(formattedDate); // Aquí tienes la fecha en el formato deseado (ejemplo: "2023-06-14")
    });
  }

  ngOnInit() {



    this.isLogged = this.tokenService.isLogged();
    this.isAdmin = this.tokenService.isAdmin();


    this.filteredLocations = this.locationControl.valueChanges.pipe(
      startWith(''),
      debounceTime(50),
      switchMap(value => this.filterLocations(value))
    );

    this.filteredOrigins = this.locationControl.valueChanges.pipe(
      startWith(''),
      debounceTime(50),
      switchMap(value => this.filterLocations(value))
    );
    this.loadFlights(); // Llamar a loadFlights() para cargar los vuelos al inicializar el componente



  }


  createFlight(){
    const dialogRef = this.dialog.open(CreateFlightComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // Aquí puedes manejar la respuesta del diálogo después de que se cierre
      console.log('Diálogo cerrado:', result);
      // Por ejemplo, puedes actualizar la lista de productos si se creó uno nuevo
      if (result === 'success') {
        this.loadFlights();
      }
    });
  }

  editFlight(id: number){
    const dialogRef = this.dialog.open(UpdateFlightComponent, {
      width: '450px',
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.snackBar.open('Vuelo actualizado', 'Éxito');
        this.flightUpdated.emit(); // Emitir el evento de Vuelo actualizado
      } else {
        this.snackBar.open('Se produjo un error al actualizar el Vuelo', 'Error');
      }
    });
  }

  detailFlight(id: number){
    const dialogRef = this.dialog.open(DetailFlightComponent, {
      width: '450px',
      data: {id: id}
    });
  }

  deleteFlight(id: number){
    this.flightService.deleteFlight(id)
      .pipe(
        tap(() => {
          console.log('Vuelo deleted successfully!');
          this.snackBar.open('Vuelo eliminada exitosamente', 'Cerrar', {
            duration: 3000,
            panelClass: 'success-snackbar'
          });
        }),
        catchError(error => {
          console.log(error);
          this.snackBar.open('Error al eliminar el Vuelo', 'Cerrar', {
            duration: 3000,
            panelClass: 'error-snackbar'
          });
          return throwError(error);
        })
      )
      .subscribe(() => {
        this.loadFlights();
      });
  }




  loadFlights() {
    this.flightService.getAllFlights().subscribe(
      response => {
        console.log(response);
        if (response.status === 'SUCCESS' && response.data && Array.isArray(response.data.content)) {
          this.flights = response.data.content.filter((flights) => !flights.deleted);
          this.totalElements = response.data.totalElements;
          this.totalPages = response.data.totalPages;
          this.lastPage = response.data.last;

          this.dataSource = new MatTableDataSource<FlightDto>(this.flights);
          this.dataSource.paginator = this.paginator; // Asignar el paginador

          // Establecer la página inicial como la primera
          this.dataSource.paginator?.firstPage();
        } else {
          console.error('Error: Respuesta inválida del servicio');
        }
        },
      error => {
        console.error(error);
      }
    );
  }

  filterFlights() {
    this.flightService.getAllFlights(undefined, undefined, this.priceMin, this.priceMax).subscribe(
      response => {
        console.log(response);
        if (response.status === 'SUCCESS' && response.data && Array.isArray(response.data.content)) {
          this.flights = response.data.content.filter((flights) => !flights.deleted);
          this.totalElements = response.data.totalElements;
          this.totalPages = response.data.totalPages;
          this.lastPage = response.data.last;

          this.dataSource = new MatTableDataSource<FlightDto>(this.flights);
          this.dataSource.paginator = this.paginator; // Asignar el paginador

          // Establecer la página inicial como la primera
          this.dataSource.paginator?.firstPage();
        } else {
          console.error('Error: Respuesta inválida del servicio');
        }
        },
      error => {
        console.error(error);
      }
    );
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.dataSource = new MatTableDataSource(this.flights.slice(startIndex, endIndex));
  }

  onLogOut(): void {
    this.tokenService.logOut();
  }

  private filterLocations(city: string): Observable<LocationsDto[]> {
    const filterValue = city.toLowerCase();
    return this.locationService.listLocations().pipe(
      map(response => response.data.filter(location =>
        location.city.toLowerCase().includes(filterValue)
      ))
    );
  }

  private filterOrigins(city: string): Observable<Origins[]> {
    const filterValue = city.toLowerCase();
    return this.locationService.listOrigins().pipe(
      map(response => response.data.filter(origins =>
        origins.city.toLowerCase().includes(filterValue)
      ))
    );
  }

  clearInputs() {
    this.priceMin = undefined;
    this.priceMax = undefined;
    this.loadFlights();
  }

  validateInputs() {
    this.isInputsValid = this.priceMin !== undefined && this.priceMax !== undefined; // Verifica si ambos inputs tienen un valor
  }


  protected readonly events = events;
}
