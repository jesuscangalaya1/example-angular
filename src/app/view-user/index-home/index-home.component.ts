import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {FlightService} from "../../services/flight.service";
import {LocationService} from "../../services/location.service";
import {DatePipe} from "@angular/common";
import {TokenService} from "../../services/token.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {FlightDto} from "../../models/flight-dto";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {CreateFlightComponent} from "../../vuelo/create-flight/create-flight.component";
import {PurchaseDbComponent} from "../../compra/purchase-db/purchase-db.component";
import {Observable} from "rxjs";
import {LocationsDto} from "../../models/locations-dto";
import {debounceTime, map, startWith, switchMap} from "rxjs/operators";
import {Origins} from "../../models/origins";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-index-home',
  templateUrl: './index-home.component.html',
  styleUrls: ['./index-home.component.scss']
})
export class IndexHomeComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<FlightDto>;
  pageSize = 5;
  pageSizeOptions: number[] = [6, 12];
  totalElements = 0; // Inicializar en 0
  totalPages: number;
  lastPage: boolean;

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

  ngOnInit() {
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

  searchFlights() {
    this.router.navigate(['/resultado-vuelos']);
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


  currentPage = 1;
  loadFlights() {
    const pageNo = this.currentPage; // Obtener el número de página actual

    this.flightService.getAllFlights(pageNo, this.pageSize).subscribe(
      response => {
        console.log(response);
        if (response.status === 'SUCCESS' && response.data && Array.isArray(response.data.content)) {
          this.flights = response.data.content;
          this.totalElements = response.data.totalElements;
          this.totalPages = response.data.totalPages;
          this.lastPage = response.data.last;


          this.dataSource = new MatTableDataSource(this.flights);

          //this.dataSource = new MatTableDataSource<FlightDto>(this.flights);
          //this.dataSource.paginator = this.paginator; // Asignar el paginador


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


  onPageChangeFlights(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadFlights();
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


}
