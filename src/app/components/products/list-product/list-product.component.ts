import {Component, EventEmitter, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PruebaCategoryService} from "../../../services/prueba-category.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TokenService} from "../../../services/token.service";
import {MatDialog} from "@angular/material/dialog";
import {Product} from "../../../models/Product";
import {PruebaProductService} from "../../../services/prueba-product.service";
import {DetailComponent} from "../../categories/detail/detail.component";
import {DetailProductComponent} from "../detail-product/detail-product.component";
import {catchError, tap, throwError} from "rxjs";
import {CreateCategoryComponent} from "../../categories/create-category/create-category.component";
import {CategoryDTO} from "../../../models/category-dto";
import {CreateProductComponent} from "../create-product/create-product.component";
import {UpdatedCategoryComponent} from "../../categories/updated-category/updated-category.component";
import {UpdatedProductComponent} from "../updated-product/updated-product.component";

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  isAdmin = false;
  productUpdated: EventEmitter<any> = new EventEmitter<any>();

  products: Product[] = []
  private categoryId: any;


  constructor(private http: HttpClient,
              private service: PruebaProductService,
              private snackBar: MatSnackBar,
              private tokenService: TokenService,
              private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.productUpdated.subscribe(() => {
      this.onListProducts(); // Actualiza la tabla cuando se emite el evento de producto actualizado
    });
    this.onListProducts();
    this.isAdmin = this.tokenService.isAdmin();

  }


  onListProducts() {
    this.service.listProducts().subscribe(
      (response) => {
        if (response.status === 'SUCCESS' && response.data && Array.isArray(response.data.content)) {
          this.products = response.data.content.filter((product) => !product.deleted);
        } else {
          console.error('Error: Respuesta inválida del servicio');
        }
      },
      (error) => {
        console.error(error);
        // Maneja el error adecuadamente
      }
    );
  }


  openCreateProductDialog(): void {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // Aquí puedes manejar la respuesta del diálogo después de que se cierre
      console.log('Diálogo cerrado:', result);
      // Por ejemplo, puedes actualizar la lista de productos si se creó uno nuevo
      if (result === 'success') {
        this.onListProducts();
      }
    });
  }

  editProduct(id: number) {
    const dialogRef = this.dialog.open(UpdatedProductComponent, {
      width: '450px',
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.snackBar.open('Producto actualizado', 'Éxito');
        this.productUpdated.emit(); // Emitir el evento de producto actualizado
      } else {
        this.snackBar.open('Se produjo un error al actualizar el producto', 'Error');
      }
    });
  }



  detailProduct(id: number) {
    const dialogRef = this.dialog.open(DetailProductComponent, {
      width: '450px',
      data: {id: id}
    });
  }


  borrar(id: number) {
    this.service.deletedProduct(id)
      .pipe(
        tap(() => {
          console.log('product deleted successfully!');
          this.snackBar.open('Producto eliminada exitosamente', 'Cerrar', {
            duration: 3000,
            panelClass: 'success-snackbar'
          });
        }),
        catchError(error => {
          console.log(error);
          this.snackBar.open('Error al eliminar la producto', 'Cerrar', {
            duration: 3000,
            panelClass: 'error-snackbar'
          });
          return throwError(error);
        })
      )
      .subscribe(() => {
        this.onListProducts(); // Actualizar la lista después de eliminar la categoría
      });
  }


}
