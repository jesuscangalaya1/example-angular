import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import {ChangePasswordComponent} from './changepassword/change/change.component';
import {ToastrModule} from "ngx-toastr";
import { SendEmailComponent } from './changepassword/send-email/send-email.component';
import { IndexComponent } from './index/index/index.component';
import { MenuComponent } from './menu/menu/menu.component';
import { DetalleProductoComponent } from './producto/detalle-producto/detalle-producto.component';
import { EditarProductoComponent } from './producto/editar-producto/editar-producto.component';
import { ListaProductoComponent } from './producto/lista-producto/lista-producto.component';
import { NuevoProductoComponent } from './producto/nuevo-producto/nuevo-producto.component';

//Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Material
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import { ListCategoriesComponent } from './components/categories/list-categories/list-categories.component';
import { CreateCategoryComponent } from './components/categories/create-category/create-category.component';
import { UpdatedCategoryComponent } from './components/categories/updated-category/updated-category.component';
import {MatTableModule} from "@angular/material/table";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import { DetailComponent } from './components/categories/detail/detail.component';
import {PruebaCategoryService} from "./services/prueba-category.service";

@NgModule({
  declarations: [
    AppComponent,
    ListaProductoComponent,
    DetalleProductoComponent,
    NuevoProductoComponent,
    EditarProductoComponent,
    LoginComponent,
    RegistroComponent,
    MenuComponent,
    IndexComponent,
    SendEmailComponent,
    ChangePasswordComponent,
    DetalleProductoComponent,
    EditarProductoComponent,
    ListaProductoComponent,
    NuevoProductoComponent,
    ListCategoriesComponent,
    CreateCategoryComponent,
    UpdatedCategoryComponent,
    DetailComponent

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        HttpClientModule,
        FormsModule,
        NgbModule,
        MatInputModule,
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatDividerModule,
        MatButtonModule,
        MatTableModule,
        MatSnackBarModule,
        MatDialogModule

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
