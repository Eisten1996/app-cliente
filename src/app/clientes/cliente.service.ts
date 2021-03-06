import {Injectable} from '@angular/core';
import {Cliente} from './cliente';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {formatDate, DatePipe, registerLocaleData} from '@angular/common';

// import {CLIENTES} from './cliente.json';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) {
  }

  getClientes(): Observable<Cliente[]> {
    // return of(CLIENTES);
    return this.http.get(this.urlEndPoint).pipe(
      tap(response => {
        console.warn('ClienteService tap 1');
        const clientes = response as Cliente[];
        clientes.forEach(cliente => {
          console.log(cliente.nombre);
        });
      }),
      map(response => {
        const clientes = response as Cliente[];
        return clientes.map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          // cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
          // cliente.createAt = new DatePipe('es-ES').transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
          return cliente;
        });
      }),
      tap(response => {
        console.warn('ClienteService tap 2');
        response.forEach(cliente => {
          console.log(cliente.nombre);
        });
      }),
    );
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if (e.status === 400) {
          console.log(e);
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  updateCliente(cliente: Cliente): Observable<any> {
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire('Error al editar al cliente', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  deleteCliente(id): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire('Error al eliminar al cliente', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
