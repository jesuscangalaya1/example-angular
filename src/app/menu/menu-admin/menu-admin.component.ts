import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent implements OnInit{

  @ViewChild('drawer') drawer: MatDrawer;
  isLogged = false;
  isAdmin = false;
  dropdownOpen: boolean = false;

  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }


  constructor(private tokenService: TokenService) { }

  ngOnInit() {


    this.isLogged = this.tokenService.isLogged();
    this.isAdmin = this.tokenService.isAdmin();

  }




  onLogOut(): void {
    this.tokenService.logOut();
  }







}
