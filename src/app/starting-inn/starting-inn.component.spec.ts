import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartingInnComponent } from './starting-inn.component';

describe('StartingInnComponent', () => {
  let component: StartingInnComponent;
  let fixture: ComponentFixture<StartingInnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartingInnComponent]
    });
    fixture = TestBed.createComponent(StartingInnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
