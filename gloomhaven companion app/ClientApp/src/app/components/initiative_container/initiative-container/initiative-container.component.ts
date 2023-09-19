import { Component, Input, OnInit } from '@angular/core';
import { EntityInitiative } from 'src/app/interfaces/entity-initiative';

@Component({
  selector: 'app-initiative-container',
  templateUrl: './initiative-container.component.html',
  styleUrls: ['./initiative-container.component.css']
})
export class InitiativeContainerComponent implements OnInit {

  @Input() entity! : EntityInitiative;

  constructor() { }

  ngOnInit(): void {
    
  }

}
