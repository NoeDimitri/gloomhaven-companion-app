import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { OnInit } from '@angular/core';
import { EntityInitiative } from 'src/app/interfaces/entity-initiative';

import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private api : ApiService) {}

  entities : EntityInitiative[] = [];
  newEntityName : string = "";

  ngOnInit(): void {


    // this.api.resetInitiatives().subscribe(data => {
    //   console.log("pogger")
    //   console.log(data)
    // })

    this.updateInitiativeList();

  }

  updateInitiativeList(){
    this.api.getSortedEntities().subscribe(data => {
      this.entities = data
    })
  }

  async createNewEntity(entityName : string){
    if (entityName == "") return;

    this.api.addEntity(entityName).subscribe(data => {
      console.log(data);
      this.updateInitiativeList();
    });

  }

  getUpdateEvent(){
    this.updateInitiativeList();
  }
  
}
