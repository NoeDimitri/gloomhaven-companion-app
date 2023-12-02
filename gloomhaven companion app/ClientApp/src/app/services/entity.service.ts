import { Injectable, OnInit, Inject } from '@angular/core';
import { ApiService } from './api.service';
import { EntityInitiative } from 'src/app/interfaces/entity-initiative';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class EntityService implements OnInit {

  // create connection to signalR hub
  constructor(private api: ApiService, @Inject('BASE_URL') private baseUrl: string) {

    var loc = window.location, ws_url;
    ws_url = environment.apiAddress + "/updateHub";

    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(ws_url)
      .build();
    
    connection.on("update", () => {
      this.updateInitiativeList();
    });

    connection.on("player_ready", () => {
      this.updatePlayersReady();
    });

    connection.on("turn_ready", () => {
      this.updateTurnReady();
    });
    
    connection.start();

  }

  entitySubject: Subject<EntityInitiative[]> = new Subject<EntityInitiative[]>;
  playersReadySubject: Subject<number> = new Subject<number>;
  turnReadySubject: Subject<boolean> = new Subject<boolean>;

  newEntityName: string = "";

  ngOnInit(): void {
  }

  getEntityObservable() {
    return this.entitySubject.asObservable();
  }

  getReadyObservable() {
    return this.playersReadySubject.asObservable();
  }

  getTurnReadyObservable() {
    return this.turnReadySubject.asObservable();
  }

  updateInitiativeList() {
    this.api.getSortedEntities().subscribe(data => {
      this.entitySubject.next(data);
    })
  }

  updatePlayersReady() {
    this.api.getReadyPlayers().subscribe(data => {
      this.playersReadySubject.next(data);
    })
  }

  updateTurnReady(){
    this.turnReadySubject.next(true);
    setTimeout(() => {
      this.turnReadySubject.next(false);
    }, 4000)
  }

  async createNewEntity(entityName: string, isPlayer : boolean) {
    if (entityName == "") return;

    this.api.addEntity(entityName, isPlayer).subscribe(data => {
      this.updateInitiativeList();
    });
  }

  resetInitiatives() {
    this.api.resetInitiatives().subscribe(data => {
      this.updateInitiativeList();
    })
  }
}
