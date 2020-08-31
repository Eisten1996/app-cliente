import {Injectable} from '@angular/core';
import {Cliente} from './cliente';
// import {CLIENTES} from './cliente.json';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) {
  }

  getClientes(): Observable<Cliente[]> {
    // return of(CLIENTES);
    return this.http.get <Cliente[]>(this.urlEndPoint);
  }
}
