import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PurchaseService} from "../../services/purchase.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TokenService} from "../../services/token.service";
import {PurchaseResponse} from "../../models/purchase-response";
import {catchError, tap, throwError} from "rxjs";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

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
                private sanitizer: DomSanitizer

  ) {
  }

  ngOnInit() {
    this.loadCustomerPurchases();
  }

  exportToPDF(id: number): void {
    this.purchaseService.exportInvoice(id).subscribe((data: Blob) => {
      const blobUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(data));
      const link = document.createElement('a');
      if (typeof blobUrl === "string") {
        link.href = blobUrl;
      }
      link.download = `Invoice_${id}.pdf`;
      link.target = '_blank';
      link.click();
    });
  }



  deletePurchase(id: number) {
      this.purchaseService.deletePurchase(id)
        .pipe(
          tap(() => {
            console.log('Vuelo deleted successfully!');
            this.snackBar.open('Vuelo eliminada exitosamente', 'Cerrar', {
              duration: 3000,
              panelClass: 'success-snackbar'
            });
          }),
          catchError(error => {
            console.log(error);
            this.snackBar.open('Error al eliminar el Vuelo', 'Cerrar', {
              duration: 3000,
              panelClass: 'error-snackbar'
            });
            return throwError(error);
          })
        )
        .subscribe(() => {
          this.loadCustomerPurchases();
        });
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
