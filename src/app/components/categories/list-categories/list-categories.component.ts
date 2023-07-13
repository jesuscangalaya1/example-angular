import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategoryDTO} from "../../../models/category-dto";
import {PruebaCategoryService} from "../../../services/prueba-category.service";
import {catchError, tap, throwError} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TokenService} from "../../../services/token.service";
import {map} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {CreateCategoryComponent} from "../create-category/create-category.component";
import {UpdatedCategoryComponent} from "../updated-category/updated-category.component";
import {DetailComponent} from "../detail/detail.component";

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {

  categories: CategoryDTO[] = [];
  isAdmin = false;


  constructor(private http: HttpClient,
              private service: PruebaCategoryService,
              private snackBar: MatSnackBar,
              private tokenService: TokenService,
              private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.onListCategories();
    this.isAdmin = this.tokenService.isAdmin();
  }

  onCreateCategory() {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        const category = new CategoryDTO(result);
        this.service.onCreate(category)
          .pipe(
            tap(() => {
              console.log('Category created successfully!');
              this.snackBar.open('Categoría guardada exitosamente', 'Cerrar', {
                duration: 3000,
                panelClass: 'success-snackbar',
              });
            }),
            catchError(error => {
              console.log(error);
              this.snackBar.open('Error al guardar la categoría', 'Cerrar', {
                duration: 3000,
                panelClass: 'error-snackbar',
              });
              return throwError(error);
            })
          )
          .subscribe(() => {
            this.onListCategories(); // Actualizar la tabla después de crear la categoría
          });
      }
    });
  }

  edit(id: number, name: string) {
    const dialogRef = this.dialog.open(UpdatedCategoryComponent, {
      width: '450px',
      data: { id:id, name:name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.snackBar.open('Categoría Actualizada', 'Exitosa');
        this.onListCategories();
      } else if (result === 2) {
        this.snackBar.open('Se produjo un error al actualizar la categoría', 'Error');
      }
    });
  }


  mostrarDialogoDetalle(id: number) {
    const dialogRef = this.dialog.open(DetailComponent, {
      width: '450px',
      data: { id: id }
    });
  }




  onListCategories() {
    this.service.listCategory()
      .subscribe(
        (response) => {
          this.categories = response.data.filter((categoria) => !categoria.deleted);
        },
        (error) => {
          console.log(error);
          // Manejar el error
        }
      );
  }


  borrar(id: number) {
    this.service.deleteById(id)
      .pipe(
        tap(() => {
          console.log('Category deleted successfully!');
          this.snackBar.open('Categoría eliminada exitosamente', 'Cerrar', {
            duration: 3000,
            panelClass: 'success-snackbar'
          });
        }),
        catchError(error => {
          console.log(error);
          this.snackBar.open('Error al eliminar la categoría', 'Cerrar', {
            duration: 3000,
            panelClass: 'error-snackbar'
          });
          return throwError(error);
        })
      )
      .subscribe(() => {
        this.onListCategories(); // Actualizar la lista después de eliminar la categoría
      });
  }
}
