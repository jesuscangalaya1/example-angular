import {Rol} from "./rol";

export interface Usuario {

  id: number;
  nombre: string;
  nombreUsuario: string;
  email: string;
  roles: Rol[];


}
