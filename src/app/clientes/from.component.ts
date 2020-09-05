import {Component, OnInit} from '@angular/core';
import {Cliente} from './cliente';
import {ClienteService} from './cliente.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-from',
  templateUrl: './from.component.html'
})
export class FromComponent implements OnInit {
  public titulo = 'Crear Cliente';
  public cliente: Cliente = new Cliente();

  constructor(private clienteService: ClienteService, private router: Router) {
  }

  ngOnInit(): void {
  }

  public create(): void {
    this.clienteService.createCliente(this.cliente).subscribe(value => this.router.navigate(['/clientes']));
  }

}
