import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PurchaseService} from "../../services/purchase.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TokenService} from "../../services/token.service";
import {PurchaseResponse} from "../../models/purchase-response";

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.scss']
})
export class ListaComprasComponent implements OnInit{

  isAdmin = false;
  purchases: PurchaseResponse[];


  constructor(  private route: ActivatedRoute,
                private purchaseService: PurchaseService,
                private snackBar: MatSnackBar,
                private tokenService: TokenService,

  ) {
  }

  ngOnInit() {
    this.loadCustomerPurchases();
  }

  loadCustomerPurchases() {
    this.purchaseService.listCustomerPurchases().subscribe(
      response => {
        console.log("data :: ", response)
        this.purchases = response;
      },
      error => {
        console.error(error);
      }
    );
  }



}
