import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WanchaiComponent } from './wanchai.component';

describe('WanchaiComponent', () => {
  let component: WanchaiComponent;
  let fixture: ComponentFixture<WanchaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WanchaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WanchaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
