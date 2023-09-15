import { Component } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private api : ApiService) {}

  ngOnInit(): void {
    this.api.addPlayerEntity("bob");
    this.api.getSortedEntities().subscribe(data => {
      console.log(data)
    })
  }
  
}
