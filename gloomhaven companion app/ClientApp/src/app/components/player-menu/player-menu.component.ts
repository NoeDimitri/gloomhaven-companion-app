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

  constructor(private entityService: EntityService) { }


  playerList : EntityInitiative[] = [];
  selectedPlayer! : EntityInitiative;
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

  changePlayer(player : EntityInitiative)
  {
    this.selectedPlayer = player;
  }

  updateInitiative(newInitiative : EntityInitiative)
  {
    
  }
//   <button *ngIf="entity.initiative <= 0" (click)="updateInitiative(newInitiative)" style="margin:1rem" class="btn btn-primary">
//   update
// </button>

}
