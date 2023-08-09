import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PurchaseService} from "../../services/purchase.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TokenService} from "../../services/token.service";
import {PurchaseResponse} from "../../models/purchase-response";
import {catchError, tap, throwError} from "rxjs";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {AlertService} from "../../services/alert/alert.service";
import Swal, {SweetAlertOptions} from "sweetalert2";

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.scss']
})
export class ListaComprasComponent implements OnInit {

  isAdmin = false;
  purchases: PurchaseResponse[];

  loading = false;


  constructor(private route: ActivatedRoute,
              private purchaseService: PurchaseService,
              private snackBar: MatSnackBar,
              private tokenService: TokenService,
              private alertService: AlertService,
  ) {
  }

  ngOnInit() {
    this.loadCustomerPurchases();
  }


  exportToPDF(id: number): void {

    this.purchaseService.exportInvoice(id).subscribe((data: Blob) => {
      const blob = new Blob([data], {type: 'application/pdf'});
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `Invoice_${id}.pdf`;
      link.target = '_blank';

      // Disparamos el evento de clic para descargar el PDF
      const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: false,
      });
      link.dispatchEvent(clickEvent);

      // Liberamos la URL segura del Blob después de unos segundos
      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 100);
    });
  }


  /*  deletePurchase(id: number) {

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
    }*/


  deletePurchase(id: number) {

    const customSwalClass: SweetAlertOptions['customClass'] = {
      container: 'custom-swal-container',
      title: 'custom-swal-title',
      confirmButton: 'btn btn-confirmation custom-confirm-button', // Añadir la clase personalizada aquí
      cancelButton: 'swal2-cancel custom-cancel-button', // Añade las clases personalizadas aquí
    };

    Swal.fire({
      title: 'Confirmación',
      html: '¿Estás seguro de que quieres eliminar este usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#2980b9',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      customClass: customSwalClass,
      buttonsStyling: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.purchaseService.deletePurchase(id)
          .subscribe(
            () => {
              console.log('User deleted successfully!');
              this.alertService.notification('Compra eliminada !', 'success'); // Muestra una notificación de éxito
              this.loading = false; // Establece el estado de carga a true
              //window.location.reload(); // Recargar la página después de eliminar exitosamente
              this.loadCustomerPurchases();


            },
            (error) => {
              console.log(error);
              this.alertService.notification('Error al eliminar Compra', 'error'); // Muestra una notificación de error
              this.loading = false; // Restablece el estado de carga a false en caso de error
            }
          );
      }
    });
  }



  loadCustomerPurchases() {
    this.loading = true;

    this.purchaseService.listCustomerPurchases().subscribe(
      response => {
        console.log("data :: ", response)
        this.purchases = response;
        this.loading = false;

      },
      error => {
        console.error(error);
        this.loading = false;

      }
    );
  }



}
