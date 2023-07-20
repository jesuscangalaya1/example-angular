import {Component, OnInit, ViewChild} from '@angular/core';
import {UsuarioService} from "../../services/usuario.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Usuario} from "../../models/usuario";
import {TokenService} from "../../services/token.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError, tap, throwError} from "rxjs";
import {AlertService} from "../../services/alert/alert.service";
import Swal, {SweetAlertOptions} from 'sweetalert2';
import {Router} from "@angular/router";

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


  loading = false;

  constructor(private service: UsuarioService,
              private tokenService: TokenService,
              private snackBar: MatSnackBar,
              private alertService: AlertService,
              private router: Router

              ) {
  }

  ngOnInit() {
    this.isLogged = this.tokenService.isLogged();
    this.isAdmin = this.tokenService.isAdmin();

    this.obtenerUsuarios();
  }


  obtenerUsuarios() {
    const pageNo = this.currentPage; // Obtener el número de página actual
    this.loading = true;

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

        this.loading = false;

      });
  }

  /*deleteUser(id: number){
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
*/


  deleteUser(id: number) {
    const customSwalClass: SweetAlertOptions['customClass'] = {
      container: 'custom-swal-container',
      title: 'custom-swal-title',
      confirmButton: 'btn btn-confirmation custom-confirm-button', // Añadir la clase personalizada aquí
      cancelButton: 'swal2-cancel custom-cancel-button', // Añade las clases personalizadas aquí
    };

    Swal.fire({
      title: 'Confirmación',
      html: '¿Estás seguro de que quieres eliminar este usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#2980b9',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      customClass: customSwalClass,
      buttonsStyling: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteUser(id)
          .subscribe(
            () => {
              console.log('User deleted successfully!');
              this.alertService.notification('Usuario eliminado!', 'success'); // Muestra una notificación de éxito
              this.loading = false; // Establece el estado de carga a true
              window.location.reload(); // Recargar la página después de eliminar exitosamente


            },
            (error) => {
              console.log(error);
              this.alertService.notification('Error al eliminar usuario', 'error'); // Muestra una notificación de error
              this.loading = false; // Restablece el estado de carga a false en caso de error
            }
          );
      }
    });
  }



  onLogOut(): void {
    this.tokenService.logOut();
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
    this.obtenerUsuarios();
  }


}
