import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from "./index/index/index.component";
import {LoginComponent} from "./auth/login/login.component";
import {LoginGuard} from "./guards/login.guard";
import {RegistroComponent} from "./auth/registro/registro.component";
import {SendEmailComponent} from "./changepassword/send-email/send-email.component";
import {ChangePasswordComponent} from "./changepassword/change/change.component";
import {ProdGuardService} from "./guards/prod-guard.service";
import {ListFlightComponent} from "./vuelo/list-flight/list-flight.component";
import {ViewFlightComponent} from "./vuelo/view-flight/view-flight.component";
import {ExportDataComponent} from "./exports/export-data/export-data.component";
import {IndexUserComponent} from "./view-user/index-user/index-user.component";
import {IndexHomeComponent} from "./view-user/index-home/index-home.component";
import {GmailHomeComponent} from "./auth/gmail-home/gmail-home.component";
import {ListUsuariosComponent} from "./usuarios/list-usuarios/list-usuarios.component";
import {ListItinerariesComponent} from "./itinerario/list-itineraries/list-itineraries.component";
import {ComprarComponent} from "./compra/comprar/comprar.component";
import {SuccessComponent} from "./compra/success/success.component";
import {PurchaseDbComponent} from "./compra/purchase-db/purchase-db.component";
import {ListaComprasComponent} from "./compra/lista-compras/lista-compras.component";
import {SearchVuelosComponent} from "./view-user/search-vuelos/search-vuelos.component";

const routes: Routes = [

  {path: '', component: IndexComponent},

  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'registro', component: RegistroComponent, canActivate: [LoginGuard]},
  {path: 'sendemail', component: SendEmailComponent, canActivate: [LoginGuard]},
  {path: 'change-password/:tokenPassword', component: ChangePasswordComponent, canActivate: [LoginGuard]},
  { path: 'success', component: SuccessComponent },

  {
    path: 'flights',
    component: ListFlightComponent,
    canActivate: [ProdGuardService],
    data: {expectedRol: ['admin']}
  },

  {
    path: 'view',
    component: ViewFlightComponent,
    canActivate: [ProdGuardService],
    data: {expectedRol: ['admin']}
  },

  {
    path: 'export-data',
    component: ExportDataComponent,
    canActivate: [ProdGuardService],
    data: {expectedRol: ['admin']}
  },
  {
    path: 'index-user',
    component: IndexUserComponent,
    canActivate: [ProdGuardService],
    data: {expectedRol: ['user']}
  },
  {
    path: 'index-home',
    component: IndexHomeComponent,
    canActivate: [ProdGuardService],
    data: {expectedRol: ['user', 'admin']}
  },

  {
    path: 'lista-compras',
    component: ListaComprasComponent,
    canActivate: [ProdGuardService],
    data: {expectedRol: ['user','admin']}
  },
  {
    path: 'pagar',
    component: ComprarComponent,
    canActivate: [ProdGuardService],
    data: {expectedRol: ['user','admin']}
  },
  {
    path: 'resultado-vuelos',
    component: SearchVuelosComponent,
    canActivate: [ProdGuardService],
    data: {expectedRol: ['user','admin']}
  },


  {
    path: 'list-users',
    component: ListUsuariosComponent,
    canActivate: [ProdGuardService],
    data: {expectedRol: ['admin']}
  },

  {
    path: 'list-itineraries',
    component: ListItinerariesComponent,
    canActivate: [ProdGuardService],
    data: {expectedRol: ['admin']}
  },




  {path: '**', redirectTo: '', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
