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
import * as XLSX from 'xlsx';


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

    if (!this.file) {
      this.alertService.notification('No se ha seleccionado ningún archivo.', 'error');
      this.loading = false;

      return;
    }

    const allowedExtensions = ['.xls', '.xlsx'];
    const fileName = this.file.name;
    const fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      this.alertService.notification('Formato de archivo no válido. Se esperaba un archivo Excel.', 'error');
      this.loading = false;

      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const fileData = e.target.result;
      const workbook = XLSX.read(fileData, {type: 'binary'});

      const requiredColumns = ['fecha_ida', 'fecha_salida', 'hora', 'destino_id', 'origen_id'];
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // Verificar si todas las columnas requeridas están presentes en la primera fila
      const headerRow = XLSX.utils.sheet_to_json(worksheet, {header: 1})[0] as string[];
      const missingColumns = requiredColumns.filter(column => !headerRow.includes(column));

      if (missingColumns.length > 0) {
        const missingColumnsText = missingColumns.join(', ');
        this.alertService.notification(`El archivo no contiene las siguientes columnas requeridas: ${missingColumnsText}`, 'error');
        this.loading = false;
        return;
      }

      // Resto de la lógica para importar los datos a la base de datos
      // ...

      this.loading = true;
      this.service.importExcel(this.file).subscribe(
        (data) => {
          console.log(data);

          this.alertService.notification('Datos importados !', 'success'); // Muestra una notificación de éxito
          this.listItineraries();
          this.loading = false;

        }
      );
    };

    reader.readAsBinaryString(this.file);
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
    this.onPageChange({pageIndex: this.currentPage, pageSize: this.pageSize, length: this.totalElements});
  }


  goToLastPage() {
    this.currentPage = this.totalPages - 1;
    this.onPageChange({pageIndex: this.currentPage, pageSize: this.pageSize, length: this.totalElements});
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.listItineraries();
  }


}
