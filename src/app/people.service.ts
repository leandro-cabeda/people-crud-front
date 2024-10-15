import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface People {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  tipoPessoa: TypePeople;
}

export interface TypePeople {
  id?: number;
  tipo: string;
}


@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private apiUrl = 'http://localhost:3000/people';

  constructor(private http: HttpClient) {}

  getPeoples(): Observable<People[]> {
    return this.http.get<People[]>(this.apiUrl);
  }

  getPeople(id: number): Observable<People> {
    return this.http.get<People>(`${this.apiUrl}/${id}`);
  }

  createPeople(people: People): Observable<People> {
    return this.http.post<People>(this.apiUrl, people);
  }

  updatePeople(id: number, people: People): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, people);
  }

  deletePeople(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
