import {Component, OnInit} from '@angular/core';
import {Cliente} from './cliente';

@Component({
  selector: 'app-from',
  templateUrl: './from.component.html'
})
export class FromComponent implements OnInit {
  private titulo = 'Crear Cliente';
  private cliente: Cliente = new Cliente();

  constructor() {
  }

  ngOnInit(): void {
  }

  public create(): void {
    console.log('Clicked');
    console.log(this.cliente);
  }

}
