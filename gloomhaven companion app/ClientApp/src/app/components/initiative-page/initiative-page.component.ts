import { Component, Input, OnInit , EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { EntityInitiative } from 'src/app/interfaces/entity-initiative';
import { EntityService } from '../../services/entity.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-initiative-page',
  templateUrl: './initiative-page.component.html',
  styleUrls: ['./initiative-page.component.css']
})
export class InitiativePageComponent implements OnInit {

  constructor(private api : ApiService, private entityService:EntityService) {}

  entities: EntityInitiative[] = [];
  newEntityName : string = "";
  isPlayer : boolean = false;

  ngOnInit(): void {

    this.entityService.getEntityObservable().subscribe((data) => {
      this.entities = data;
    })
    this.entityService.updateInitiativeList();
  }

  updateInitiativeList(){
    this.entityService.updateInitiativeList();
  }

  async createNewEntity(entityName : string){
    this.entityService.createNewEntity(entityName);
  }

  resetInitiatives(){
    this.entityService.resetInitiatives();
  }

}
