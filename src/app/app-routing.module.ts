import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from "./index/index/index.component";
import {LoginComponent} from "./auth/login/login.component";
import {LoginGuard} from "./guards/login.guard";
import {RegistroComponent} from "./auth/registro/registro.component";
import {SendEmailComponent} from "./changepassword/send-email/send-email.component";
import {ChangePasswordComponent} from "./changepassword/change/change.component";
import {ProdGuardService} from "./guards/prod-guard.service";
import {ListaProductoComponent} from "./producto/lista-producto/lista-producto.component";
import {DetalleProductoComponent} from "./producto/detalle-producto/detalle-producto.component";
import {NuevoProductoComponent} from "./producto/nuevo-producto/nuevo-producto.component";
import {EditarProductoComponent} from "./producto/editar-producto/editar-producto.component";
import {ListCategoriesComponent} from "./components/categories/list-categories/list-categories.component";
import {CreateCategoryComponent} from "./components/categories/create-category/create-category.component";
import {UpdatedCategoryComponent} from "./components/categories/updated-category/updated-category.component";
import {DetailComponent} from "./components/categories/detail/detail.component";

const routes: Routes = [

  {path: '', component: IndexComponent},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'registro', component: RegistroComponent, canActivate: [LoginGuard]},
  {path: 'sendemail', component: SendEmailComponent, canActivate: [LoginGuard]},
  {path: 'change-password/:tokenPassword', component: ChangePasswordComponent, canActivate: [LoginGuard]},
  {
    path: 'lista',
    component: ListaProductoComponent,
    canActivate: [ProdGuardService],
    data: {expectedRol: ['admin', 'user']}
  },
  {
    path: 'detalle/:id',
    component: DetalleProductoComponent,
    canActivate: [ProdGuardService],
    data: {expectedRol: ['admin', 'user']}
  },
  {path: 'nuevo',
    component: NuevoProductoComponent,
    canActivate: [ProdGuardService],
    data: {expectedRol: ['admin']}
  },

  {
    path: 'editar/:id',
    component: EditarProductoComponent,
    canActivate: [ProdGuardService],
    data: {expectedRol: ['admin']}
  },


  /*----------------------------*/

  {
    path: 'list',
    component: ListCategoriesComponent,
    canActivate: [ProdGuardService],
    data: {expectedRol: ['admin', 'user']}
  },

  {path: 'new',
    component: CreateCategoryComponent,
    canActivate: [ProdGuardService],
    data: {expectedRol: ['admin', 'user']}
  },
  {
    path: 'updated/:id',
    component: UpdatedCategoryComponent,
    canActivate: [ProdGuardService],
    data: {expectedRol: ['admin','user']}
  },
  {
    path: 'view/:id',
    component: DetailComponent,
    canActivate: [ProdGuardService],
    data: {expectedRol: ['admin', 'user']}
  },

  {path: '**', redirectTo: '', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
