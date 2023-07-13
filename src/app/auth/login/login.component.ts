import {Component, OnInit} from '@angular/core';
import {LoginUsuario} from "../../models/login-usuario";
import {TokenService} from "../../services/token.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgOneTapService} from "ng-google-one-tap";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;

  errMsj: string;
  hidePassword: boolean = true;


  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private onetap: NgOneTapService,

  ) {
  }

  ngOnInit() {

  }



  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.tokenService.setToken(data.token);
        if (this.tokenService.isAdmin()) {
          this.router.navigate(['/flights']); // Redirige al administrador
        } else {
          this.router.navigate(['/index-home']); // Redirige al usuario normal
        }      },
      err => {
        this.errMsj = err.error.mensaje;
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }



  // GMAIL - AUTH ...



}



