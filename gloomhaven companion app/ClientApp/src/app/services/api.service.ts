import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getSortedEntities(){
    // console.log(this.baseUrl + 'api/GameEntities/sorted');
    return this.http.get<any>(this.baseUrl + 'api/GameEntities');
  }

  addPlayerEntity(playerName : string){
    const headers = { 'content-type': 'application/json'} ;
    return this.http.post(this.baseUrl + 'api/GameEntities/CreateEntity', JSON.stringify(playerName), {'headers': headers});
  }


  addEntity(){
    // console.log(this.baseUrl + 'api/GameEntities/sorted');
    const headers = { 'content-type': 'application/json'} ;
    
    const newHomie = {"entityName" : "paul"}
    const body = JSON.stringify(newHomie);

    return this.http.post(this.baseUrl + body, "paul");
  }
}
