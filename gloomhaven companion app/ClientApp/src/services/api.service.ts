import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getSortedEntities(){
    console.log(this.baseUrl + 'api/GameEntities/sorted');
    return this.http.get<any>(this.baseUrl + 'api/GameEntities/sorted');
  }
}
