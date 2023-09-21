import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent implements OnInit {

  @Input() mensaje: any;
  @Output() respuesta = new EventEmitter<any>();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  inicializar(){}

  aceptar(): void {
    this.respuesta.emit('SI');
    this.activeModal.close();
  }

  onClose() {
    this.activeModal.close();
  }

}
