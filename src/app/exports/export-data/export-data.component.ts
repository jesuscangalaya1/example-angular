import {Component, OnInit, ViewChild} from '@angular/core';
import {LocationService} from "../../services/location.service";
import {FlightService} from "../../services/flight.service";
import {DatePipe} from "@angular/common";
import {TokenService} from "../../services/token.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {FlightDto} from "../../models/flight-dto";
import {MatDialog} from "@angular/material/dialog";
import {ExportDialogComponent} from "../export-dialog/export-dialog.component";
import {AlertService} from "../../services/alert/alert.service";


@Component({
  selector: 'app-export-data',
  templateUrl: './export-data.component.html',
  styleUrls: ['./export-data.component.scss']
})
export class ExportDataComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: MatTableDataSource<FlightDto>;
  displayedColumns: string[] = ['id', 'capacity', 'duration', 'price', 'departureTime',
    'iti-arrival','iti-desparture',
    'ori-city', 'ori-country', 'ori-airport', 'dest-city', 'dest-country', 'dest-airport'];
  pageSize = 3;
  pageSizeOptions: number[] = [5, 10, 25];
  totalElements = 0; // Inicializar en 0
  totalPages: number;
  lastPage: boolean;
  flights: FlightDto[] = [];


  isLogged = false;
  isAdmin = false;

  priceMin: number | undefined;
  priceMax: number | undefined;
  isInputsValid = false; // Agrega una variable para controlar la validez de los inputs

  openPDF: any;

  loading = false;

  constructor(
    private locationService: LocationService,
    private flightService: FlightService,
    private tokenService: TokenService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private alertService: AlertService,
  ) {
  }

  ngOnInit() {
    this.loadFlights();
  }

  openExportDialog(){
    const dialogRef = this.dialog.open(ExportDialogComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { format, priceMin, priceMax, pageNo, pageSize } = result;
        this.exportToFormat(format, priceMin, priceMax, pageNo, pageSize);
      }
    });
  }
  exportToFormat(format: string, priceMin?: number, priceMax?: number, pageNo?: number, pageSize?: number): void {
    let fileName: string = 'flights-data';

    if (format === 'excel') {
      fileName += '.xlsx';
    } else if (format === 'pdf') {
      fileName += '.pdf';
    }

    this.flightService.exportFlights(pageNo, pageSize, priceMin, priceMax, format).subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
      },
      (error: any) => {
        console.error('Error exporting flights data:', error);
      }
    );
  }





  exportFlightsData(): void {
    this.flightService.exportFlights().subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'flights-data.xlsx'; // Nombre del archivo de descarga
        link.click();
      },
      (error: any) => {
        console.error('Error exporting flights data:', error);
      }
    );
  }

  exportFlightsDataPdf(): void {
    this.flightService.exportFlights(undefined, undefined, undefined, undefined, 'pdf').subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'flights-data.pdf'; // Nombre del archivo de descarga
        link.click();
      },
      (error: any) => {
        console.error('Error exporting flights data:', error);
      }
    );
  }



 currentPage = 0
  loadFlights() {
    const pageNo = this.currentPage; // Obtener el número de página actual
    this.loading = true;

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

          this.loading = false; // Restablece el estado de carga a false

        } else {
          console.error('Error: Respuesta inválida del servicio');
          this.loading = false; // Restablece el estado de carga a false

        }
      },
      error => {
        console.error(error);
        this.loading = false; // Restablece el estado de carga a false

      }
    );
  }

  filterFlights() {
    this.loading = true;

    this.flightService.getAllFlights(undefined, undefined, this.priceMin, this.priceMax).subscribe(
      response => {
        console.log(response);
        if (response.status === 'SUCCESS' && response.data && Array.isArray(response.data.content)) {
          this.flights = response.data.content.filter((flights) => !flights.deleted);
          this.totalElements = response.data.totalElements;
          this.totalPages = response.data.totalPages;
          this.lastPage = response.data.last;

          this.dataSource = new MatTableDataSource(this.flights);

          //this.dataSource = new MatTableDataSource<FlightDto>(this.flights);
          //this.dataSource.paginator = this.paginator; // Asignar el paginador


          // Establecer la página inicial como la primera
          this.dataSource.paginator?.firstPage();

          this.alertService.notification('Precios Encontrados !', 'success'); // Muestra una notificación de éxito

          this.loading = false; // Restablece el estado de carga a false

        } else {
          console.error('Error: Respuesta inválida del servicio');
          this.loading = false;

        }
      },
      error => {
        console.error(error);
        this.loading = false;

      }
    );
  }


  goToFirstPage() {
    this.currentPage = 0;
    this.onPageChangeFlights({ pageIndex: this.currentPage, pageSize: this.pageSize, length: this.totalElements });
  }


  goToLastPage() {
    this.currentPage = this.totalPages - 1;
    this.onPageChangeFlights({ pageIndex: this.currentPage, pageSize: this.pageSize, length: this.totalElements });
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

  clearInputs() {
    this.priceMin = undefined;
    this.priceMax = undefined;
    this.loadFlights();
  }

  validateInputs() {
    this.isInputsValid = this.priceMin !== undefined && this.priceMax !== undefined; // Verifica si ambos inputs tienen un valor
  }


  protected readonly event = event;
}
