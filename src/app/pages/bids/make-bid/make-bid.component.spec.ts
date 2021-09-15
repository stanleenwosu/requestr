import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeBidComponent } from './make-bid.component';

describe('MakeBidComponent', () => {
  let component: MakeBidComponent;
  let fixture: ComponentFixture<MakeBidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeBidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
