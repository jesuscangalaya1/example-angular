import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {CommonModule, DatePipe, NgOptimizedImage} from "@angular/common";
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
import { DetailComponent } from './components/categories/detail/detail.component';
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import { ListProductComponent } from './components/products/list-product/list-product.component';
import { DetailProductComponent } from './components/products/detail-product/detail-product.component';
import { UpdatedProductComponent } from './components/products/updated-product/updated-product.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import { ListFlightComponent } from './vuelo/list-flight/list-flight.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { ViewFlightComponent } from './vuelo/view-flight/view-flight.component';
import { MenuAdminComponent } from './menu/menu-admin/menu-admin.component';
import {MatBadgeModule} from "@angular/material/badge";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";
import { CreateFlightComponent } from './vuelo/create-flight/create-flight.component';
import { UpdateFlightComponent } from './vuelo/update-flight/update-flight.component';
import { DetailFlightComponent } from './vuelo/detail-flight/detail-flight.component';
import { ExportDataComponent } from './exports/export-data/export-data.component';
import { IndexUserComponent } from './view-user/index-user/index-user.component';
import { PackageStartComponent } from './view-user/pages/package-start/package-start.component';
import { BookingStartComponent } from './view-user/pages/booking-start/booking-start.component';
import { ProcessStartComponent } from './view-user/pages/process-start/process-start.component';
import { TeamStartComponent } from './view-user/pages/team-start/team-start.component';
import { TestimonialStartComponent } from './view-user/pages/testimonial-start/testimonial-start.component';
import { FooterComponent } from './view-user/pages/footer/footer.component';
import { IndexHomeComponent } from './view-user/index-home/index-home.component';

import { environment } from 'src/environments/environment';
import {NgGoogleOneTapModule} from "ng-google-one-tap";
import { GmailHomeComponent } from './auth/gmail-home/gmail-home.component';
import { ListUsuariosComponent } from './usuarios/list-usuarios/list-usuarios.component';
import { ListItinerariesComponent } from './itinerario/list-itineraries/list-itineraries.component';
import { ComprarComponent } from './compra/comprar/comprar.component';

import { NgxBraintreeModule } from 'ngx-braintree';
import { SuccessComponent } from './compra/success/success.component';
import { PurchaseDbComponent } from './compra/purchase-db/purchase-db.component';
import { ListaComprasComponent } from './compra/lista-compras/lista-compras.component';
import { SearchVuelosComponent } from './view-user/search-vuelos/search-vuelos.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuAdminComponent,
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
    DetailComponent,
    ListProductComponent,
    DetailProductComponent,
    UpdatedProductComponent,
    CreateProductComponent,
    ListFlightComponent,
    ViewFlightComponent,
    CreateFlightComponent,
    UpdateFlightComponent,
    DetailFlightComponent,
    ExportDataComponent,
    IndexUserComponent,
    PackageStartComponent,
    BookingStartComponent,
    ProcessStartComponent,
    TeamStartComponent,
    TestimonialStartComponent,
    FooterComponent,
    IndexHomeComponent,
    GmailHomeComponent,
    ListUsuariosComponent,
    ListItinerariesComponent,
    ComprarComponent,
    SuccessComponent,
    PurchaseDbComponent,
    ListaComprasComponent,
    SearchVuelosComponent,


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
        MatDialogModule,
        MatListModule,
        MatMenuModule,
        MatOptionModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        NgOptimizedImage,
        MatBadgeModule,
        MatRadioModule,
        MatCheckboxModule,
        MatCardModule,
        NgxBraintreeModule,
        MatPaginatorModule,
        NgGoogleOneTapModule.config(
        {  //Look options table for some more avaialbe options and config here.
          client_id: environment.clientId,
          cancel_on_tap_outside: false,
          authvalidate_by_googleapis: false,
          auto_select: false,
          disable_exponential_cooldowntime: false,
          context: 'signup'
        })


    ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
