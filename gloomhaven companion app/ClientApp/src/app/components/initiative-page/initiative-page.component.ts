import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { EntityInitiative } from 'src/app/interfaces/entity-initiative';

@Component({
  selector: 'app-initiative-page',
  templateUrl: './initiative-page.component.html',
  styleUrls: ['./initiative-page.component.css']
})
export class InitiativePageComponent implements OnInit {

  constructor(private api : ApiService) {}

  entities : EntityInitiative[] = [];
  newEntityName : string = "";
  isPlayer : boolean = false;

  ngOnInit(): void {

    this.updateInitiativeList();

  }

  updateInitiativeList(){
    this.api.getSortedEntities().subscribe(data => {
      this.entities = data
    })
  }

  async createNewEntity(entityName : string){
    if (entityName == "") return;

    this.api.addEntity(entityName, this.isPlayer).subscribe(data => {
      this.updateInitiativeList();
    });

  }

  getUpdateEvent(){
    this.updateInitiativeList();
  }

  resetInitiatives(){

    this.api.resetInitiatives().subscribe(data => {
      this.updateInitiativeList();
    })
  }

}
