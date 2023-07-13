import {Component, OnInit, ViewChild} from '@angular/core';
import {UsuarioService} from "../../services/usuario.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {FlightDto} from "../../models/flight-dto";
import {Usuario} from "../../models/usuario";
import {TokenService} from "../../services/token.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError, tap, throwError} from "rxjs";

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrls: ['./list-usuarios.component.scss']
})
export class ListUsuariosComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: MatTableDataSource<Usuario>;
  displayedColumns: string[] = ['id', 'name', 'nombreUsuario', 'email', 'role_name','deleted'];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25];
  totalElements = 0; // Inicializar en 0
  totalPages: number;
  lastPage: boolean;

  usuarios: Usuario[] = [];

  currentPage = 0;

  isLogged = false;
  isAdmin = false;

  constructor(private service: UsuarioService,
              private tokenService: TokenService,
              private snackBar: MatSnackBar,

              ) {
  }

  ngOnInit() {
    this.isLogged = this.tokenService.isLogged();
    this.isAdmin = this.tokenService.isAdmin();

    this.obtenerUsuarios();
  }


  obtenerUsuarios() {
    const pageNo = this.currentPage; // Obtener el número de página actual
    this.service.obtenerUsuarios(pageNo, this.pageSize)
      .subscribe(response => {
        console.log("data :: ", response)
        this.usuarios = response.data.content;
        this.totalElements = response.data.totalElements;
        console.log(this.totalElements)
        this.totalPages = response.data.totalPages;
        console.log(this.totalPages)
        this.lastPage = response.data.last;

        this.dataSource = new MatTableDataSource(this.usuarios);
        // Establecer la página inicial como la primera
        this.dataSource.paginator?.firstPage();
      });
  }
  deleteUser(id: number){
      this.service.deleteUser(id)
        .pipe(
          tap(() => {
            console.log('User deleted successfully!');
            this.snackBar.open('User eliminada exitosamente', 'Cerrar', {
              duration: 3000,
              panelClass: 'success-snackbar'
            });
          }),
          catchError(error => {
            console.log(error);
            this.snackBar.open('Error al eliminar el User', 'Cerrar', {
              duration: 3000,
              panelClass: 'error-snackbar'
            });
            return throwError(error);
          })
        )
        .subscribe(() => {
          this.obtenerUsuarios();
        });
    }





  onLogOut(): void {
    this.tokenService.logOut();
  }


  //paginator

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.obtenerUsuarios();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.obtenerUsuarios();
    }
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.obtenerUsuarios();
  }


}
