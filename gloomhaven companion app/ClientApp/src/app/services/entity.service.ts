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
    connection.start();

  }

  entitySubject: Subject<EntityInitiative[]> = new Subject<EntityInitiative[]>;
  newEntityName: string = "";
  isPlayer: boolean = false;

  ngOnInit(): void {
  }

  getEntityObservable() {
    return this.entitySubject.asObservable();
  }

  updateInitiativeList() {
    this.api.getSortedEntities().subscribe(data => {
      this.entitySubject.next(data);
    })
  }

  async createNewEntity(entityName: string) {
    if (entityName == "") return;

    this.api.addEntity(entityName, this.isPlayer).subscribe(data => {
      this.updateInitiativeList();
    });

  }

  resetInitiatives() {
    this.api.resetInitiatives().subscribe(data => {
      this.updateInitiativeList();
    })
  }
}
