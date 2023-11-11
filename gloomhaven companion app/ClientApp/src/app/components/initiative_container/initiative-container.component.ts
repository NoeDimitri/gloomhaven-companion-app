import { Component, Input, OnInit , EventEmitter, Output} from '@angular/core';
import { EntityInitiative } from 'src/app/interfaces/entity-initiative';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-initiative-container',
  templateUrl: './initiative-container.component.html',
  styleUrls: ['./initiative-container.component.css']
})
export class InitiativeContainerComponent implements OnInit {

  @Input() entity! : EntityInitiative;
  @Output() childEmitter: EventEmitter<any> = new EventEmitter();

  newInitiative! : number;

  constructor(private apiService : ApiService) { }

  ngOnInit(): void {
    
  }

  updateInitiative(newInitiative : number){
    if(!newInitiative || isNaN(Number(newInitiative)))
    {
      throw Error("invalid input");
    }

    this.apiService.updateEntityInitiative(this.entity.id, newInitiative).subscribe(data => {
      this.childEmitter.emit("update initiative!");
    });
  }

  deleteEntity(){
    this.apiService.deleteEntity(this.entity.id).subscribe(data => {
      this.childEmitter.emit("update character list");
    });
  }
}
