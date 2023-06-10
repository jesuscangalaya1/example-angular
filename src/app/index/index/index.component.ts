import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  nombreUsuario: string;

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    this.nombreUsuario = this.tokenService.getUserName();
  }

}
