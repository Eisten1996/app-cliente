import {Component, OnInit} from '@angular/core';
import {Cliente} from './cliente';
import {ClienteService} from './cliente.service';
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-from',
  templateUrl: './from.component.html'
})
export class FromComponent implements OnInit {
  public titulo = 'Crear Cliente';
  public cliente: Cliente = new Cliente();

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.clienteService.getCliente(id).subscribe(cliente => this.cliente = cliente);
      }
    });
  }

  create(): void {
    this.clienteService.createCliente(this.cliente).subscribe(cliente => {
      Swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} creado con exito`, `success`);
      return this.router.navigate(['/clientes']);
    });
  }

}
