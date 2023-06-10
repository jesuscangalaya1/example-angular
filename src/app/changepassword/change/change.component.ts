import {Component, OnInit} from '@angular/core';
import {ChangePasswordDTO} from "../../models/change-password-dto";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {EmailPasswordService} from "../../services/email-password.service";

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

  constructor(
    private emailPasswordService: EmailPasswordService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  onChangePassword(): void {
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
      },
      err => {
        this.toastrService.error(err.error.mensaje, 'FAIL', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
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

}
