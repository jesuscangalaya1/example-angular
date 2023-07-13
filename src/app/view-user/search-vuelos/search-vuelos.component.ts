import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FlightDto} from "../../models/flight-dto";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Observable, tap} from "rxjs";
import {LocationsDto} from "../../models/locations-dto";
import {debounceTime, map, startWith, switchMap} from "rxjs/operators";
import {Origins} from "../../models/origins";
import {PurchaseDbComponent} from "../../compra/purchase-db/purchase-db.component";
import {LocationService} from "../../services/location.service";
import {FlightService} from "../../services/flight.service";
import {DatePipe} from "@angular/common";
import {TokenService} from "../../services/token.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-search-vuelos',
  templateUrl: './search-vuelos.component.html',
  styleUrls: ['./search-vuelos.component.scss']
})
export class SearchVuelosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<FlightDto>;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10,15];
  totalElements = 0; // Inicializar en 0
  totalPages: number;
  lastPage: boolean;

  displayedColumns: string[] = ['id', 'capacity', 'duration', 'price', 'departureTime','image'];

  isInputsValid = false;

  locationControl = new FormControl();
  filteredLocations: Observable<LocationsDto[]>;
  filteredOrigins: Observable<Origins[]>;
  fechaVueltaControl = new FormControl();
  fechaIdaControl = new FormControl();


  flights: FlightDto[] = [];
  priceMin: number | undefined;
  priceMax: number | undefined;


  isLogged = false;
  isAdmin = false;

  constructor(private locationService: LocationService,
              private flightService: FlightService,
              private datePipe: DatePipe,
              private tokenService: TokenService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
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
  ngOnInit(): void {
    this.loadFlights();


    // Obtener los detalles del vuelo de los parámetros de la URL
    const flightDetails = history.state.flightDetails;
    console.log(flightDetails);
    // Aquí puedes utilizar los detalles del vuelo en tu lógica de compra


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

  }

  purchaseFlight(flightId: number, flightImage: string, flightPrice: number) {
    const dialogRef = this.dialog.open(PurchaseDbComponent, {
      width: '650px',
      data: {
        flightId: flightId,
        flightImage: flightImage,
        flightPrice: flightPrice
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Diálogo cerrado:', result);
      if (result === 'success') {
        this.loadFlights();
      }
    });
  }

  loadFlights() {
    this.flightService.getAllFlights(1).subscribe(
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
}
