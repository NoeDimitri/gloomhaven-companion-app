import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getSortedEntities(){
    return this.http.get<any>('https://localhost:7229/api/GameEntities/sorted');
  }
}
