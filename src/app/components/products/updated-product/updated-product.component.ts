import {Component, Inject, OnInit} from '@angular/core';
import {PruebaCategoryService} from "../../../services/prueba-category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../../models/Product";
import {PruebaProductService} from "../../../services/prueba-product.service";
import {CategoryDTO} from "../../../models/category-dto";

@Component({
  selector: 'app-updated-product',
  templateUrl: './updated-product.component.html',
  styleUrls: ['./updated-product.component.scss']
})
export class UpdatedProductComponent implements OnInit{

  product: Product = {
    category: undefined, image: undefined,
    name: '',
    price: null,
    description: '',
    categoryId: null
  };

  id: number;

  categories: CategoryDTO[] = [];

  constructor(
    private service: PruebaProductService,
    private serviceCategory: PruebaCategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialogRef<UpdatedProductComponent>,
    @Inject(MAT_DIALOG_DATA)private data: any

  ) {
    this.id = data.id;
  }

  ngOnInit() {


    this.loadProduct()
    this.loadCategories()
  }

  onUpdateProduct(): void {
    this.service.updatedProduct(this.id,this.product).subscribe(
      (response: any) => {
        if (response.status === 'SUCCESS') {
          this.dialogRef.close('success');

        } else {
          console.error('Error actualizando producto:', response.message);
        }
      },
      (error) => {
        console.log('Error actualizando producto:', error);
      }
    );
  }
  private loadProduct(): void {
    this.service.getProductById(this.id).subscribe(
      (response: any) => {
        console.log('Response:', response); // Verificar la respuesta del servidor en la consola

        if (response && response.id) {
          this.product = response; // Asignar la respuesta completa a this.product
        } else {
          console.error('Error cargando producto:', response && response.message);
        }
      },
      (error) => {
        console.log('Error cargando producto:', error);
      }
    );
  }



  private loadCategories(): void {
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


  cancel(): void {
    this.dialogRef.close();
  }

}
