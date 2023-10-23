import { Component, OnInit } from '@angular/core';
import { EntityInitiative } from 'src/app/interfaces/entity-initiative';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-player-menu',
  templateUrl: './player-menu.component.html',
  styleUrls: ['./player-menu.component.css']
})
export class PlayerMenuComponent implements OnInit {

  constructor(private apiService : ApiService) { }

  playerList : EntityInitiative[] = [];
  newEntityName : string = "";
  isPlayer : boolean = false;

  ngOnInit(): void {

    this.updateInitiativeList();

  }

  updateInitiativeList(){
    this.apiService.getSortedEntities().subscribe(data => {
      data.forEach((element: EntityInitiative) => {
        console.log(element.entityName)
        if(element.isPlayer)
        {
          this.playerList.push(element)
        }
      });
    })
  }

}
