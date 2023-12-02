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

  constructor(private entityService: EntityService, private api: ApiService) { }


  playerList : EntityInitiative[] = [];
  selectedPlayer! : EntityInitiative;
  newInitiative!: number;
  numPlayers: number = 0;
  readyPlayers: number = 0;
  newTurn: boolean = false;

  ngOnInit(): void {

    this.entityService.getEntityObservable().subscribe((data) => {
      this.playerList = [];
      data.forEach((element: EntityInitiative) => {
        if (element.isPlayer) {
          this.playerList.push(element)
        }
      });
    });

    this.entityService.getReadyObservable().subscribe((data) => {
      this.readyPlayers = data;
    })

    this.entityService.getTurnReadyObservable().subscribe((data) => {
      this.newTurn = data;
    })

    this.entityService.updateInitiativeList();
    this.entityService.updatePlayersReady();
  }

  changePlayer(player : EntityInitiative)
  {
    this.selectedPlayer = player;
  }

  updateInitiative()
  {
    this.api.updatePlayerInitiative(this.selectedPlayer.id, this.newInitiative).subscribe();
    // Temporary fix so that the loading bar updates! :D
    this.selectedPlayer.temp_initiative = this.newInitiative;
  }

  identify(index: number, item: any)
  {
    return item.id;
  }


}
