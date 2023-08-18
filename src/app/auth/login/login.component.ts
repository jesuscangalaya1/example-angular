import {Component, OnInit} from '@angular/core';
import {LoginUsuario} from "../../models/login-usuario";
import {TokenService} from "../../services/token.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgOneTapService} from "ng-google-one-tap";
import {AlertService} from "../../services/alert/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;

  hidePassword: boolean = true;

  loading = false;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private onetap: NgOneTapService,
    private alertService: AlertService,
  ) {
  }

  ngOnInit() {

  }

  onLogin(): void {


    this.loading = true;
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.tokenService.setToken(data.token);
        if (this.tokenService.isAdmin()) {
          this.router.navigate(['/flights']); // Redirige al administrador
        } else {
          this.router.navigate(['/index-home']); // Redirige al usuario normal
        }
        this.alertService.notification('Inicio de sesión exitoso', 'success'); // Muestra una notificación de éxito
        this.loading = false; // Restablece el estado de carga a false
      },
      err => {
        this.alertService.notification('Compruebe sus datos ... ', 'error'); // Muestra una notificación de error
        this.loading = false; // Restablece el estado de carga a false
      }
    );
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }


}



