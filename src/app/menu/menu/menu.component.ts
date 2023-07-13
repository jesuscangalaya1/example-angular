import {Component, OnInit, ViewChild} from '@angular/core';
import {TokenService} from "../../services/token.service";
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @ViewChild('drawer') drawer: MatDrawer;
  isLogged = false;
  isAdmin = false;
  dropdownOpen: boolean = false;


  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    this.isLogged = this.tokenService.isLogged();
    this.isAdmin = this.tokenService.isAdmin();

  }

  onLogOut(): void {
    this.tokenService.logOut();
  }


  toggleDrawer() {
    this.drawer.toggle();
  }
  isNavbarOpen = false;

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }


}
