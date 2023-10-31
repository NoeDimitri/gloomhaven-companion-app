import { Component, OnInit } from '@angular/core';
import { EntityInitiative } from 'src/app/interfaces/entity-initiative';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { EntityService } from '../../services/entity.service';

@Component({
  selector: 'app-player-menu',
  templateUrl: './player-menu.component.html',
  styleUrls: ['./player-menu.component.css']
})
export class PlayerMenuComponent implements OnInit {

  constructor(private apiService : ApiService, private entityService: EntityService) { }


  playerList : EntityInitiative[] = [];
  newEntityName : string = "";
  isPlayer : boolean = false;

  ngOnInit(): void {

    this.entityService.getEntityObservable().subscribe((data) => {
      data.forEach((element: EntityInitiative) => {
        if (element.isPlayer) {
          this.playerList.push(element)
        }
      });
    });

    this.entityService.updateInitiativeList();
  }

}
