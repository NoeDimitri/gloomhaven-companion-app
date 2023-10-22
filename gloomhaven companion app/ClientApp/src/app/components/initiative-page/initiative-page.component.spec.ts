import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativePageComponent } from './initiative-page.component';

describe('InitiativePageComponent', () => {
  let component: InitiativePageComponent;
  let fixture: ComponentFixture<InitiativePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiativePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitiativePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
