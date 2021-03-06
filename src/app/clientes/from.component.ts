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

  public errores: string[];

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.clienteService.getCliente(id).subscribe(cliente => this.cliente = cliente);
      }
    });
  }

  create(): void {
    this.clienteService.createCliente(this.cliente).subscribe(cliente => {
      Swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} creado con exito`, `success`);
      this.router.navigate(['/clientes']);
    }, err => {
      this.errores = err.error.errors as string[];
      console.error('Codigo del error desde el backend: ' + err.status);
      console.error(err.error.errors);
    });
  }

  update(): void {
    this.clienteService.updateCliente(this.cliente).subscribe(response => {
      Swal.fire('Cliente Actualizado', `${response.mensaje} : ${response.cliente.nombre}`, `success`);
      this.router.navigate(['/clientes']);
    }, err => {
      this.errores = err.error.errors as string[];
      console.error('Codigo del error desde el backend: ' + err.status);
      console.error(err.error.errors);
    });
  }

}
