import {Component, OnInit} from '@angular/core';
import {Cliente} from './cliente';
import {CLIENTES} from './cliente.json';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.clientes = CLIENTES;
  }

}
