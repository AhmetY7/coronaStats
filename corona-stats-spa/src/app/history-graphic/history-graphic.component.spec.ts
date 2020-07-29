import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryGraphicComponent } from './history-graphic.component';

describe('HistoryGraphicComponent', () => {
  let component: HistoryGraphicComponent;
  let fixture: ComponentFixture<HistoryGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryGraphicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
