import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/models/cliente.model';
import { ClientesService } from 'src/app/services/clientes.service';
import { AgregarclienteComponent } from '../agregarcliente/agregarcliente.component';
import { ConfirmsaveupdateComponent } from '../confirmsaveupdate/confirmsaveupdate.component';
import { MensajeComponent } from '../mensaje/mensaje.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  listaClientes: Cliente[] = [];

  constructor(private clientesService: ClientesService,
              private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.obtenerClientes();
  }


  registrarActualizarCliente(cliente?: Cliente){
    const modalCliente = this.modalService.open(AgregarclienteComponent, {size: 'lg'});
    modalCliente.componentInstance.cliente = cliente;
    modalCliente.componentInstance.title = cliente == null ? 'Registrar Cliente' : 'Actualizar Cliente';
    modalCliente.componentInstance.accion = cliente == null ? 'REGISTRAR': 'ACTUALIZAR';
    modalCliente.componentInstance.respuesta.subscribe((data: any) => {
      if (data == 'SI'){
        this.obtenerClientes();
      }
    })
  }

  obtenerClientes(){
    this.clientesService.obtenerClientes().subscribe( (response: any) => {
      this.listaClientes = response;
      this.listaClientes = this.listaClientes.sort(function (a, b) {
        return (a.idCliente > b.idCliente) ? 1: -1;
      });

    })
  }


  eliminarCliente(id: number){
  const modalConfirm = this.modalService.open(ConfirmsaveupdateComponent, {size: 'lg'});
  modalConfirm.componentInstance.mensaje = '¿Seguro que desea eliminar el cliente?';
  modalConfirm.componentInstance.respuesta.subscribe((data: any) => {
    if (data == 'SI'){

      this.clientesService.deleteCliente(id).subscribe((result: any) => {
        console.log('actualizado correctamente');
        const modalMensaje = this.modalService.open(MensajeComponent, {size: 'lg'});
        modalMensaje.componentInstance.mensaje = 'Cliente borrado correctamente';
        modalMensaje.componentInstance.respuesta.subscribe((data: any) => {
          this.obtenerClientes();
        })
        },
        (error: any) => {
          console.log('hubo errores =>', error);
        }
      );
    }
  });

  }
}
