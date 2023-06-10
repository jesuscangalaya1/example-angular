import {Component, OnInit} from '@angular/core';
import {NuevoUsuario} from "../../models/nuevo-usuario";
import {TokenService} from "../../services/token.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  nuevoUsuario: NuevoUsuario;
  nombre: string;
  nombreUsuario: string;
  email: string;
  password: string;
  errMsj: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  onRegister(): void {
    this.nuevoUsuario = new NuevoUsuario(this.nombre, this.nombreUsuario, this.email, this.password);
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      data => {
        this.toastr.success(data.mensaje, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });

        this.router.navigate(['/login']);
      },
      err => {
        this.errMsj = err.error.mensaje;
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  hidePassword: boolean = true;

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

}
