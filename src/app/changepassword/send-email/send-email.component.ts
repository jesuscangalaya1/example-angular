import {Component, OnInit} from '@angular/core';
import {EmailValuesDTO} from "../../models/email-values-dto";
import {EmailPasswordService} from "../../services/email-password.service";
import {ToastrService} from "ngx-toastr";
import {AlertService} from "../../services/alert/alert.service";

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {

  mailTo: string;
  dto: EmailValuesDTO;

  loading = false;

  constructor(
    private emailPasswordService: EmailPasswordService,
    private toastrService: ToastrService,
    private alertService: AlertService,

  ) { }

  ngOnInit() {
  }

  onSendEmail(): void {
    this.loading = true;
    this.dto = new EmailValuesDTO(this.mailTo);
    this.emailPasswordService.sendEmail(this.dto).subscribe(
      data => {

        this.alertService.notification('Revise su correo, \nle enviamos un mensaje !', 'success'); // Muestra una notificación de éxito
        this.loading = false;

      },
      err => {

        this.alertService.notification('Seguro que es su correo ?, \nDigite bien su correo !', 'error');
        this.loading = false;

      }
    );
  }

}

