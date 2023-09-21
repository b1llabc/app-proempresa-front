import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmsaveupdate',
  templateUrl: './confirmsaveupdate.component.html',
  styleUrls: ['./confirmsaveupdate.component.css']
})
export class ConfirmsaveupdateComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  @Output() respuesta = new EventEmitter<any>();
  @Input() mensaje: any;

  ngOnInit(): void {
  }

  cerrar(): void {
    this.respuesta.emit('NO');
    this.activeModal.close();
  }

  aceptar(): void {
    this.respuesta.emit('SI');
    this.activeModal.close();
  }

  onClose() {
    this.activeModal.close();
  }

}
