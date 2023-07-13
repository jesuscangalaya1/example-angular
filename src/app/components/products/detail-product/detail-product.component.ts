import {Component, Inject, OnInit} from '@angular/core';
import {Product} from "../../../models/Product";
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PruebaProductService} from "../../../services/prueba-product.service";

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit{

  product: Product;

  constructor(private service: PruebaProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.product = data.product;
  }

  ngOnInit() {
    const id = this.data.id;
    this.service.getProductById(id).subscribe(
      data => {
        console.log(data);
        this.product = data;
      },
      err => {
        console.log(err);
        this.volver();
      }
    );
  }


  volver(): void {
    this.router.navigate(['/products']);
  }

}
