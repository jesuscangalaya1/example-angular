import {Component, OnInit} from '@angular/core';
import {ChangePasswordDTO} from "../../models/change-password-dto";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {EmailPasswordService} from "../../services/email-password.service";
import {AlertService} from "../../services/alert/alert.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  password: string;
  confirmPassword: string;
  tokenPassword: string;

  dto: ChangePasswordDTO;
  loading = false;
  passwordsMatch = true;

  constructor(
    private emailPasswordService: EmailPasswordService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private fb: FormBuilder
  ) {   this.createForm();
  }
  passwordForm: FormGroup;
  ngOnInit() {



  }

  createForm(): void {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }
  onChangePassword(): void {
    this.loading = true;

    if(this.password !== this.confirmPassword) {
      this.toastrService.error('Las contraseñas no coinciden', 'FAIL', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      return;
    }

    this.tokenPassword = this.activatedRoute.snapshot.params['tokenPassword'];
    this.dto = new ChangePasswordDTO(this.password, this.confirmPassword, this.tokenPassword);
    this.emailPasswordService.changePassword(this.dto).subscribe(
      data => {
        this.toastrService.success(data.mensaje, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/login']);

        this.alertService.notification('Su contraseña fue cambiado !', 'success'); // Muestra una notificación de éxito
        this.loading = false;

      },
      err => {
        this.toastrService.error(err.error.mensaje, 'FAIL', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });

        this.alertService.notification('Digite bien su contraseña ! ', 'error');
        this.loading = false;

      }
    );
  }

  hideConfirmPassword: boolean = true;

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  hidePassword: boolean = true;

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  passwordMatch(): boolean {
    return this.password === this.confirmPassword;
  }

  passwordMismatch(): boolean {
    const password = this.passwordForm.get('password').value;
    const confirmPassword = this.passwordForm.get('confirmPassword').value;
    return password !== confirmPassword;
  }


}
