import {Component, OnInit} from '@angular/core';
import {Cliente} from './cliente';

@Component({
  selector: 'app-from',
  templateUrl: './from.component.html'
})
export class FromComponent implements OnInit {
  public titulo = 'Crear Cliente';
  public cliente: Cliente = new Cliente();

  constructor() {
  }

  ngOnInit(): void {
  }

  public create(): void {
    console.log('Clicked');
    console.log(this.cliente);
  }

}
