import {Component, Inject, Input, OnInit} from '@angular/core';
import {CategoryDTO} from "../../../models/category-dto";
import {ProductoService} from "../../../services/producto.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {PruebaCategoryService} from "../../../services/prueba-category.service";
import {catchError, tap, throwError} from "rxjs";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Product} from "../../../models/Product";

@Component({
  selector: 'app-updated-category',
  templateUrl: './updated-category.component.html',
  styleUrls: ['./updated-category.component.scss']
})
export class UpdatedCategoryComponent implements OnInit {

  //category: CategoryDTO= null;
  category: CategoryDTO = { id: 0, name: '' }; // inicializar la categoría con valores por defecto
  id: number;



  constructor(
    private service: PruebaCategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialogRef<UpdatedCategoryComponent>,
    @Inject(MAT_DIALOG_DATA)private data: any

  ) {
    this.id = data.id;
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.service.getCategoryById(this.id).subscribe(
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
    this.service.updateCategory(this.id, this.category).subscribe(
      data => {
        this.dialogRef.close(1);
      },
      err => {
        console.log(err);
        this.dialogRef.close(2);
      }
    );
  }


}
