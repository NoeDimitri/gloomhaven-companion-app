import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeContainerComponent } from './initiative-container.component';

describe('InitiativeContainerComponent', () => {
  let component: InitiativeContainerComponent;
  let fixture: ComponentFixture<InitiativeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiativeContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitiativeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
