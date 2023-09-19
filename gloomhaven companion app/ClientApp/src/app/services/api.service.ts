import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getSortedEntities(){
    // console.log(this.baseUrl + 'api/GameEntities/sorted');
    return this.http.get<any>(this.baseUrl + 'api/GameEntities/sorted');
  }

  addEntity(entityName : string){
    const headers = { 'content-type': 'application/json'} ;
    let params = new HttpParams().set('entityName' , entityName);
    return this.http.post(this.baseUrl + 'api/GameEntities/CreateEntity', null, {'params': params});
  }

  resetInitiatives(){
    const headers = { 'content-type': 'application/json'} ;

    return this.http.put<any>(this.baseUrl + 'api/GameEntities/resetInitiative', null);
  }

  updateEntityInitiative(id : number, newInitiative : number){

    let params = new HttpParams().set('newInitiative', newInitiative);
    return this.http.put(this.baseUrl + 'api/GameEntities/' + id, null, {'params':params});
  }

  deleteEntity(id : number){
    return this.http.delete(this.baseUrl + 'api/GameEntities/' + id);
  }
}
