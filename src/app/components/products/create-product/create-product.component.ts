import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PruebaCategoryService} from "../../../services/prueba-category.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TokenService} from "../../../services/token.service";
import {CategoryDTO} from "../../../models/category-dto";
import {PruebaProductService} from "../../../services/prueba-product.service";
import {Product} from "../../../models/Product";


export interface Category{
  id: number;
  name: string;
}

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  product: Product = {
    category: undefined, image: undefined,
    name: '',
    price: null,
    description: '',
    categoryId: null
  };

  categories: CategoryDTO [] = []; // Variable para almacenar las categorías
  isAdmin = false;

  constructor(private router: Router,
              private service: PruebaProductService,
              private serviceCategory: PruebaCategoryService,
              private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<CreateProductComponent>,
              private tokenService: TokenService,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }


  ngOnInit() {
    this.loadCategories()

  }


  cancel(): void {
    this.dialogRef.close();
    this.isAdmin = this.tokenService.isAdmin();

  }


  onCreateProduct(): void {
    this.service.createProduct(this.product).subscribe(
      (response: any) => {
        if (response.status === 'SUCCESS') {
          this.snackBar.open('PRODUCT SUCCESSFULLY CREATED', '', { duration: 2000 });
          this.dialogRef.close('success');
        } else {
          console.error('Error creating product:', response.message);
        }
      },
      (error) => {
        console.log('Error creating product:', error);
      }
    );
  }


  loadCategories(): void {
    this.serviceCategory.listCategory().subscribe(
      (response: any) => {
        if (response.status === 'SUCCESS' && Array.isArray(response.data)) {
          this.categories = response.data;
        } else {
          console.error('Error: Invalid data format for categories');
        }
      },
      (error) => {
        console.log('Error loading categories:', error);
      }
    );
  }



}




