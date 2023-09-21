import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/models/cliente.model';
import { ClientesService } from 'src/app/services/clientes.service';
import { ConfirmsaveupdateComponent } from '../confirmsaveupdate/confirmsaveupdate.component';
import { MensajeComponent } from '../mensaje/mensaje.component';

@Component({
  selector: 'app-agregarcliente',
  templateUrl: './agregarcliente.component.html',
  styleUrls: ['./agregarcliente.component.css']
})
export class AgregarclienteComponent implements OnInit {

  @Input() cliente!: Cliente;
  @Input() accion: any;
  @Input() title: any;
  @Output() respuesta = new EventEmitter<any>();

  formCliente!: FormGroup;

  constructor(private activeModal: NgbActiveModal,
              private clientesService: ClientesService,
              private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.inicializar();
  }

  inicializar(){
    this.formCliente = new FormGroup({
      nombres: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      nroDocumento: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });

    if (this.accion == 'ACTUALIZAR') {
      this.nombres.setValue(this.cliente.nombres);
      this.apellidos.setValue(this.cliente.apellidos);
      this.nroDocumento.setValue(this.cliente.nroDocumento);
      this.email.setValue(this.cliente.email);
    }
  }

  agregarCliente(){
    let cliente: Cliente = {
      idCliente: 0,
      nombres:  this.nombres.value,
      apellidos:  this.apellidos.value,
      nroDocumento: this.nroDocumento.value,
      email:  this.email.value,
      createAt: new Date
    }
    this.clientesService.guardarCliente(cliente).subscribe( (response:any) => {
      console.log('guardado correctamente:', response)
    })
  }


  actualizarCliente(cliente: Cliente){
    this.cliente.nombres = this.nombres.value,
    this.cliente.apellidos = this.apellidos.value,
    this.cliente.nroDocumento = this.nroDocumento.value,
    this.cliente.email = this.email.value,

    this.clientesService.actualizarCliente(cliente).subscribe( (response: any) => {
      console.log('actualizado correctamente:', response)
    })
  }

  registrtarActualizarCliente() {
    if (this.formCliente.valid){
      if (this.accion == 'REGISTRAR') {
        const modalConfirm = this.modalService.open(ConfirmsaveupdateComponent, {size: 'lg'});
        modalConfirm.componentInstance.mensaje = '¿Seguro que desea registrar el cliente?';
        modalConfirm.componentInstance.respuesta.subscribe((data: any) => {
          if (data == 'SI'){
            let cliente = this.setCliente();
            this.clientesService.guardarCliente(cliente).subscribe(
              (result: any) => {
                if (result != null) {
                  console.log('registrado correctamente');
                  const modalMensaje = this.modalService.open(MensajeComponent, {size: 'lg'});
                  modalMensaje.componentInstance.mensaje = 'Cliente registrado correctamente';
                  modalMensaje.componentInstance.respuesta.subscribe((data: any) => {
                    if (data == 'SI'){
                      this.onClose();
                      this.respuesta.emit('SI');
                    }
                  })
                }
              },
              (error: any) => {
              }
            );
          }
        });
      }
      if (this.accion == 'ACTUALIZAR') {
        const modalConfirm = this.modalService.open(ConfirmsaveupdateComponent, {size: 'lg'});
        modalConfirm.componentInstance.mensaje = '¿Seguro que desea actualizar el cliente?';
        modalConfirm.componentInstance.respuesta.subscribe((data: any) => {
          if (data == 'SI'){

            this.cliente.nombres = this.nombres.value,
            this.cliente.apellidos = this.apellidos.value,
            this.cliente.nroDocumento = this.nroDocumento.value,
            this.cliente.email = this.email.value,

            this.clientesService.actualizarCliente(this.cliente).subscribe(
              (result: any) => {
                if (result != null) {
                  console.log('actualizado correctamente');
                  const modalMensaje = this.modalService.open(MensajeComponent, {size: 'lg'});
                  modalMensaje.componentInstance.mensaje = 'Cliente actualizado correctamente';
                  modalMensaje.componentInstance.respuesta.subscribe((data: any) => {
                    if (data == 'SI'){
                      this.onClose();
                      this.respuesta.emit('SI');
                    }
                  })
                }
              },
              (error: any) => {
                console.log('hubo errores =>', error);
              }
            );
          }
        });
      }
    }else{
      this.formCliente.markAllAsTouched();
    }
  }


  get nombres() {return this.formCliente.get('nombres') as FormControl;}
  get apellidos() {return this.formCliente.get('apellidos') as FormControl;}
  get nroDocumento() {return this.formCliente.get('nroDocumento') as FormControl;}
  get email() { return this.formCliente.get('email') as FormControl; }


  setCliente(){
    let cliente: Cliente = {
      idCliente: 0,
      nombres:  this.nombres.value,
      apellidos:  this.apellidos.value,
      nroDocumento: this.nroDocumento.value,
      email:  this.email.value,
      createAt: new Date,
      //createAt: ''
    }
    return cliente;
  }

  validarFormControl(form: FormGroup, control: string, mensaje: string) {
    let tipoMensaje = '';
    let tipoError = '';

    const formuControl = form.get(control) as any;
    if (this.estadoControl(form, control)) {
      let errors: any = formuControl.errors;
      for (var key in errors) {
        tipoError = key;
      }
      switch (tipoError) {
        case 'required':
          tipoMensaje = this.estaVacio(mensaje) ? 'El campo es obligatorio': mensaje;
          break;
      }
    }
    return tipoMensaje;
  }

  estadoControl(form: FormGroup, control: string) {
    const formuControl = form.get(control) as any;
    if (formuControl.errors != null && formuControl.touched) {
      return true;
    }
    return false;
  }

  estaVacio(val: any) {
    if (val == null || val == undefined) {
      return true;
    }
    return false;
  }

  onClose() {
    this.activeModal.close();
  }

}
