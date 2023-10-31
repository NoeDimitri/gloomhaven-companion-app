import { Injectable, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { EntityInitiative } from 'src/app/interfaces/entity-initiative';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntityService implements OnInit {

  constructor(private api: ApiService) {

  }

  entitySubject: Subject<EntityInitiative[]> = new Subject<EntityInitiative[]>;
  newEntityName: string = "";
  isPlayer: boolean = false;

  ngOnInit(): void {

    this.updateInitiativeList();
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
