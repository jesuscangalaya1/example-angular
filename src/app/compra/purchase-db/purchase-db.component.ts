import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FlightService} from "../../services/flight.service";
import {PurchaseRequest} from "../../models/purchase-request";
import {PurchaseService} from "../../services/purchase.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TokenService} from "../../services/token.service";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-purchase-db',
  templateUrl: './purchase-db.component.html',
  styleUrls: ['./purchase-db.component.scss']
})
export class PurchaseDbComponent implements OnInit {

  flightId: number;
  amount: number;
  price: number;
  flightImage: string; // Agrega esta variable para almacenar la imagen del vuelo
  flightPrice: number; // Agrega esta variable para almacenar el precio del vuelo

  isAdmin = false;

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private purchaseService: PurchaseService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PurchaseDbComponent>,
    private tokenService: TokenService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.flightId = data.flightId; // Asignar el flightId desde los datos inyectados
    this.flightImage = data.flightImage; // Asignar la URL de la imagen desde los datos inyectados
    this.flightPrice = data.flightPrice; // Asigna el precio del vuelo desde los datos inyectados

  }

  ngOnInit() {


  }

  comprarVuelo() {

    const purchaseRequest: PurchaseRequest = {
      amount: this.amount,
      price: this.flightPrice,
      flightId: this.flightId
    };

    console.log("purchaseRequest:", purchaseRequest);

    const token = this.tokenService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };

    console.log("httpOptions:", httpOptions);
    console.log("token:", token);

    this.loading = true;

    this.purchaseService.purchaseFlight(purchaseRequest, httpOptions).subscribe(
      response => {
        console.log("response:", response); // Maneja la respuesta de la compra exitosa
        this.dialogRef.close(); // Cierra el modal
        this.router.navigate(['/pagar']); // Realiza la redirección
        this.loading = false;

      },
      error => {
        console.error("error:", error); // Maneja el error de la compra
        // Muestra el mensaje de error al usuario
        const errorMessage = "Error al realizar la compra. Por favor, intenta nuevamente.";
        // Puedes mostrar el mensaje de error en un MatSnackBar o cualquier otro componente de notificación
        this.snackBar.open(errorMessage, "Cerrar", {
          duration: 3000, // Duración del mensaje en milisegundos
        });

        this.loading = false;

      }
    );
  }

  cancel(): void {
    this.dialogRef.close();
    this.isAdmin = this.tokenService.isAdmin();

  }


}





