import {Component, OnInit} from '@angular/core';
import {CategoryDTO} from "../../../models/category-dto";
import {ProductoService} from "../../../services/producto.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {PruebaCategoryService} from "../../../services/prueba-category.service";
import {catchError, tap, throwError} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-updated-category',
  templateUrl: './updated-category.component.html',
  styleUrls: ['./updated-category.component.scss']
})
export class UpdatedCategoryComponent implements OnInit {

  //category: CategoryDTO= null;
  category: CategoryDTO = { id: 0, name: '' }; // inicializar la categoría con valores por defecto

  constructor(
    private service: PruebaCategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
/*    const id = this.activatedRoute.snapshot.params['id'];
    console.log('ID:', id); // Verifica el ID que se está pasando
    this.service.getCategoryById(id).subscribe(
      data => {
        console.log('Response:', data); // Verifica la respuesta completa del servidor
        this.category = data;
        console.log(this.category); // Verifica si se asigna correctamente
      },
      err => {
        this.router.navigate(['/']);
        console.log(err);
      }
    );*/
    const id = this.activatedRoute.snapshot.params['id'];
    this.service.getCategoryById(id).subscribe(
      data => {
        this.category = data
      },
      err => {
        this.router.navigate(['/']);
        console.log(err);
      }
    );

  }



  onUpdateCategory() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.service.updateCategory(id, this.category).subscribe(
      data => {
        this.router.navigate(['/list']);
      },
      err => {
        console.log(err);

      }
    );
  }



}
