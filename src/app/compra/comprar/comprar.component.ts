import {Component, OnInit} from '@angular/core';
import {PaymentService} from "../../services/payment.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {BraintreeDto} from "../../models/braintree-dto";
import {map} from "rxjs/operators";
import {TokenService} from "../../services/token.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {CreateFlightComponent} from "../../vuelo/create-flight/create-flight.component";
import {PurchaseDbComponent} from "../purchase-db/purchase-db.component";
import {AlertService} from "../../services/alert/alert.service";

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.scss']
})
export class ComprarComponent implements OnInit{
  amount: number;


  isLogged = false;
  isAdmin = false;

  loading = false;


  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private tokenService: TokenService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private alertService: AlertService,

  ) { }

  ngOnInit(): void {

    this.isLogged = this.tokenService.isLogged();
    this.isAdmin = this.tokenService.isAdmin();


  }

  onPaymentStatus(event): void {

  }


  purchaseFlight(){
    const dialogRef = this.dialog.open(PurchaseDbComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // Aquí puedes manejar la respuesta del diálogo después de que se cierre
      console.log('Diálogo cerrado:', result);
      // Por ejemplo, puedes actualizar la lista de productos si se creó uno nuevo
/*      if (result === 'success') {
        this.loadFlights();
      }*/
    });
  }


  getClientToken(): Observable<any> {
    return this.paymentService.getToken().pipe(map(
      data => {
        return data.token;
      },
      err => {
        console.log(err)
      }
    ));
  }

  checkout(nonce: string, amount: number): Observable<any> {
    console.log('Nonce: ' + nonce);
    console.log('Amount: ' + amount);
    this.loading = true;
    const dto = new BraintreeDto(nonce, amount);
    return this.paymentService.checkout(dto).pipe(map(
      data => {
        this.router.navigate(['/index-home']);
        this.alertService.notification('Compra Exitosa', 'success'); // Muestra una notificación de éxito
        this.loading = false; // Restablece el estado de carga a false
        return data;
      },
      err => {
        console.log(err)
        this.alertService.notification('Error', 'error'); // Muestra una notificación de error

        this.loading = false; // Restablece el estado de carga a false
      }
    ));
  }


}
