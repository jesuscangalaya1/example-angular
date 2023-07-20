import {Component, OnInit, ViewChild} from '@angular/core';
import {TokenService} from "../../services/token.service";
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  @ViewChild('drawer') drawer: MatDrawer;
  isLogged = false;
  isAdmin = false;
  dropdownOpen: boolean = false;

  loading = false;

  constructor(private tokenService: TokenService,

  ) { }

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
