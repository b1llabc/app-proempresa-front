import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  expandNav: boolean = false;
  validar: number[] = [];
  suscribe: any;

  constructor() { }

  ngOnInit(): void {
  }

}
