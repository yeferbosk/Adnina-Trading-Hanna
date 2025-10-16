import { Injectable } from '@angular/core';
import {map, Observable, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  constructor(private http: HttpClient , private router : Router) { }


  createOrder(order :any): Observable<string[]> {
    const token = localStorage.getItem('access_token');

    if (!token) {
      console.error('No se encontró el token en localStorage');
      return throwError(() => new Error('Token no encontrado'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any[]>('http://localhost:8000/order',order, { headers }).pipe(
      map(actions => actions.map(action => action.nombre))
    );
  }

  getOrder(id: number): Observable<any[]> {
    const token = localStorage.getItem('access_token');

    if (!token) {
      console.error('No se encontró el token en localStorage');
      return throwError(() => new Error('Token no encontrado'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>('http://localhost:8000/order', { headers }).pipe(
      map(actions => actions.filter(action => action.usuario_id === id))
    );
  }


  getOrders(): Observable<any[]> {
    const token = localStorage.getItem('access_token');

    if (!token) {
      console.error('No se encontró el token en localStorage');
      return throwError(() => new Error('Token no encontrado'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>('http://localhost:8000/order', { headers }).pipe(
      map(actions => actions.filter(action => action))
    );
  }



  calcularPortafolio(id: number): void {
    const token = localStorage.getItem('access_token');

    if (!token) {
      console.error('No se encontró el token en localStorage');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any[]>('http://localhost:8000/order', { headers }).pipe(
      map(ordenes => ordenes.filter(orden => orden.usuario_id === id)),
      map(ordenesFiltradas => {
        let total = 0;
        for (const orden of ordenesFiltradas) {
          if (orden.tipo_orden.toUpperCase().includes('BUY')) {
            total += orden.precio;
          } else if (orden.tipo_orden.toUpperCase().includes('SELL')) {
            total -= orden.precio;
          }
        }
        return total;
      })
    ).subscribe({
      next: (portafolioTotal) => {
        localStorage.setItem('portafolio', JSON.stringify(portafolioTotal));
        console.log('Portafolio guardado:', portafolioTotal);
      },
      error: (err) => {
        console.error('Error al calcular el portafolio:', err);
      }
    });
  }




}
