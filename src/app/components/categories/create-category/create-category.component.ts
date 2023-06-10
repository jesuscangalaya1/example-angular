import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {PruebaCategoryService} from "../../../services/prueba-category.service";
import {CategoryDTO} from "../../../models/category-dto";
import {catchError, tap, throwError} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent {

  name = '';

  constructor(private router: Router ,
              private service: PruebaCategoryService,
              private snackBar: MatSnackBar

  ) {
  }


  onCreateCategory(){
    const category = new CategoryDTO(this.name);
    this.service.onCreate(category)
      .pipe(
        tap(() => {
          console.log('Category deleted successfully!');
          this.snackBar.open('Categoría Guardada exitosamente', 'Cerrar', {
            duration: 3000,
            panelClass: 'success-snackbar'
          });
        }),
        catchError(error => {
          console.log(error);
          this.snackBar.open('Error al guardar la categoría', 'Cerrar', {
            duration: 3000,
            panelClass: 'error-snackbar'
          });
          return throwError(error);
        })
      )
      .subscribe();
  }


}

