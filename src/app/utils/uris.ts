import { environment } from './../../environments/environment';
export class URIS {

  static uriBaseLocal =  environment.uriBaseLocal;

  //URIS CLIENTE
  static GET_ALL = this.uriBaseLocal + '/proempresa/clientes/all';
  static GET_BY_ID = this.uriBaseLocal + '/proempresa/clientes/getById/';
  static SAVE = this.uriBaseLocal + '/proempresa/clientes/save';
  static UPDATE = this.uriBaseLocal + '/proempresa/clientes/update';
  static DELETE = this.uriBaseLocal + '/proempresa/clientes/delete/';
}

