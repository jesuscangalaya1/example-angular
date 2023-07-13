import {Component, OnInit} from '@angular/core';
import {ProductoService} from "../../services/producto.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Producto} from "../../models/producto";
import {PruebaCategoryService} from "../../services/prueba-category.service";
import {Product} from "../../models/Product";

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent implements OnInit {

  producto: Producto = null;

  constructor(
    private service: PruebaCategoryService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit() {

  }

  volver(): void {
    this.router.navigate(['/lista']);
  }


}
