import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {}

  getSortedEntities(){
    return this.http.get<any>(environment.apiAddress + '/api/GameEntities/sorted');
  }

  getReadyPlayers() {
    return this.http.get<number>(environment.apiAddress + '/api/GameEntities/num-ready');
  }

  addEntity(entityName : string, isPlayer: boolean){
    const headers = { 'content-type': 'application/json'} ;
    let params = new HttpParams().set('entityName' , entityName).set('isPlayer', isPlayer);
    return this.http.post(environment.apiAddress + '/api/GameEntities/CreateEntity', null, {'params': params});
  }

  resetInitiatives(){
    const headers = { 'content-type': 'application/json'} ;

    return this.http.put<any>(environment.apiAddress + '/api/GameEntities/resetInitiative', null);
  }

  updateEntityInitiative(id : number, newInitiative : number){
    let params = new HttpParams().set('newInitiative', newInitiative);
    return this.http.put(environment.apiAddress + '/api/GameEntities/' + id, null, {'params':params});
  }

  updatePlayerInitiative(id: number, newInitiative: number) {
    let params = new HttpParams().set('newInitiative', newInitiative);
    return this.http.put(environment.apiAddress + '/api/GameEntities/' + id + '/player-initiative', null, { 'params': params });
  }

  deleteEntity(id : number){
    return this.http.delete(environment.apiAddress + '/api/GameEntities/' + id);
  }
}
