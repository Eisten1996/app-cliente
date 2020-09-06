import {Injectable} from '@angular/core';
import {Cliente} from './cliente';
// import {CLIENTES} from './cliente.json';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  getClientes(): Observable<Cliente[]> {
    // return of(CLIENTES);
    return this.http.get <Cliente[]>(this.urlEndPoint);
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders});
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders});
  }
}
