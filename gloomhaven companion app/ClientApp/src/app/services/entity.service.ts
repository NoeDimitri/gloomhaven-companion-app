import { Injectable, OnInit } from '@angular/core';
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
  constructor(private api: ApiService) {

    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl("https://localhost:7229/updateHub")
      .build();
    
    connection.on("update", () => {
      this.updateInitiativeList();
    });

    connection.on("player_ready", () => {
      this.updatePlayersReady();
    });
    connection.start();

  }

  entitySubject: Subject<EntityInitiative[]> = new Subject<EntityInitiative[]>;
  playersReadySubject: Subject<number> = new Subject<number>;

  newEntityName: string = "";

  ngOnInit(): void {
  }

  getEntityObservable() {
    return this.entitySubject.asObservable();
  }

  getReadyObservable() {
    return this.playersReadySubject.asObservable();
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
