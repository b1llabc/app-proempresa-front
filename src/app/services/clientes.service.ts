import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilService } from '../utils/utilservice';
import { URIS } from '../utils/uris';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient, private utilService: UtilService) {}

  obtenerClientes() {
    return this.utilService.GET(URIS.GET_ALL);
  }

  obtenerPorID(id: number) {
    return this.utilService.GET(URIS.GET_BY_ID + id);
  }

  guardarCliente(cliente: Cliente) {
    return this.utilService.POST(URIS.SAVE, cliente);
  }

  actualizarCliente(cliente: Cliente) {
    return this.utilService.PUT(URIS.UPDATE, cliente);
  }

  deleteCliente(id: number) {
    return this.http.delete<Response>(URIS.DELETE + id);
  }
}
