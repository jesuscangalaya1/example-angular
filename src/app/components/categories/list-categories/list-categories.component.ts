import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategoryDTO} from "../../../models/category-dto";
import {PruebaCategoryService} from "../../../services/prueba-category.service";
import {catchError, tap, throwError} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TokenService} from "../../../services/token.service";
import {map} from "rxjs/operators";

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
              private tokenService: TokenService
  ) {
  }

  ngOnInit() {
    this.onListCategories();
    this.isAdmin = this.tokenService.isAdmin();
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
