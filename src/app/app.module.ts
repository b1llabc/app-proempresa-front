import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppPrimengModule } from './primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './components/clientes/clientes.component';
import { AgregarclienteComponent } from './components/agregarcliente/agregarcliente.component';
import { ConfirmsaveupdateComponent } from './components/confirmsaveupdate/confirmsaveupdate.component';
import { MensajeComponent } from './components/mensaje/mensaje.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    AgregarclienteComponent,
    ConfirmsaveupdateComponent,
    MensajeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppPrimengModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
