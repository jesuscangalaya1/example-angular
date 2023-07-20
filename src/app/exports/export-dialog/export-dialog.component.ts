import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../services/alert/alert.service";

@Component({
  selector: 'app-export-dialog',
  templateUrl: './export-dialog.component.html',
  styleUrls: ['./export-dialog.component.scss']
})
export class ExportDialogComponent implements OnInit {
  format: string;
  priceMin: number;
  priceMax: number;
  pageNo: number;
  pageSize: number;
  cancelClicked: boolean = false;

  loading = false;

  constructor(public dialogRef: MatDialogRef<ExportDialogComponent>,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.format = 'excel';
    this.priceMin = null;
    this.priceMax = null;
    this.pageNo = 1; // Establecer el número de página predeterminado
    this.pageSize = 10; // Establecer el tamaño de página predeterminado
  }


  exportData(): void {
    // Verificar si los campos de precio mínimo y máximo tienen valores válidos
    const validPriceMin = typeof this.priceMin === 'number';
    const validPriceMax = typeof this.priceMax === 'number';

    // Establecer los valores de los campos como undefined si no son válidos
    const priceMinValue = validPriceMin ? this.priceMin : undefined;
    const priceMaxValue = validPriceMax ? this.priceMax : undefined;
    this.loading = true; // Activar el estado de carga

 /*   this.dialogRef.close({

      format: this.format,
      priceMin: priceMinValue,
      priceMax: priceMaxValue,
      pageNo: this.pageNo,
      pageSize: this.pageSize
    });*/

    const exportPromise = new Promise<void>((resolve) => {
      // Simula una operación de carga de datos, por ejemplo, una llamada a un servicio
      setTimeout(() => {
        resolve();
      }, 2000);
    });

    exportPromise.then(() => {
      this.alertService.notification('Exportado ,\n Espere un segundo !', 'success'); // Muestra una notificación de éxito

      this.loading = false;
      this.dialogRef.close({
        format: this.format,
        priceMin: priceMinValue,
        priceMax: priceMaxValue,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      });
    });
  }


  cancel(): void {
    this.cancelClicked = true;
    this.dialogRef.close();
  }
}
