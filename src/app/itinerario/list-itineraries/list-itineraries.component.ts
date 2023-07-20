import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Usuario} from "../../models/usuario";
import {UsuarioService} from "../../services/usuario.service";
import {TokenService} from "../../services/token.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Itinerary} from "../../models/itinerary";
import {ItineraryService} from "../../services/itinerary.service";
import {AlertService} from "../../services/alert/alert.service";

@Component({
  selector: 'app-list-itineraries',
  templateUrl: './list-itineraries.component.html',
  styleUrls: ['./list-itineraries.component.scss']
})
export class ListItinerariesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: MatTableDataSource<Itinerary>;
  displayedColumns: string[] = ['id', 'departureDate', 'ArrivalDate', 'Hour', 'city-ori', 'country-ori', 'city-des', 'country-des'];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25];
  totalElements = 0; // Inicializar en 0
  totalPages: number;
  lastPage: boolean;


  currentPage = 0;


  itineraries: Itinerary[] = [];

  isLogged = false;
  isAdmin = false;

  file: any;
  loading = false;


  constructor(private service: ItineraryService,
              private tokenService: TokenService,
              private alertService: AlertService,
  ) {
  }

  ngOnInit() {
    this.isLogged = this.tokenService.isLogged();
    this.isAdmin = this.tokenService.isAdmin();

    this.listItineraries()
  }


  listItineraries() {
    const pageNo = this.currentPage; // Obtener el número de página actual
    this.loading = true;

    this.service.listItineraries(pageNo, this.pageSize)
      .subscribe(response => {
        console.log("data :: ", response)
        this.itineraries = response.data.content;
        this.totalElements = response.data.totalElements;
        console.log(this.totalElements)
        this.totalPages = response.data.totalPages;
        console.log(this.totalPages)
        this.lastPage = response.data.last;

        this.dataSource = new MatTableDataSource(this.itineraries);
        // Establecer la página inicial como la primera
        this.dataSource.paginator?.firstPage();

        this.loading = false;

      });
  }


  selectedFile(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  uploadFile() {
    this.loading = true;

    this.service.importExcel(this.file).subscribe(
      (data) => {
        console.log(data);

        this.alertService.notification('Datos importados !', 'success'); // Muestra una notificación de éxito
        this.listItineraries();
        this.loading = false;

      },
      (error) => {
        console.log(error);
        this.alertService.notification('Error !', 'error'); // Muestra una notificación de éxito

        this.loading = false;

      }
    );
  }


  onPageChangee(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.dataSource = new MatTableDataSource(this.itineraries.slice(startIndex, endIndex));
  }

  onLogOut(): void {
    this.tokenService.logOut();
  }


  //paginator a mano

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.listItineraries();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.listItineraries();
    }
  }


  goToFirstPage() {
    this.currentPage = 0;
    this.onPageChange({ pageIndex: this.currentPage, pageSize: this.pageSize, length: this.totalElements });
  }


  goToLastPage() {
    this.currentPage = this.totalPages - 1;
    this.onPageChange({ pageIndex: this.currentPage, pageSize: this.pageSize, length: this.totalElements });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.listItineraries();
  }


}
