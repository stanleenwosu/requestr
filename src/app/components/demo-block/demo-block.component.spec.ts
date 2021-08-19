import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoBlockComponent } from './demo-block.component';

describe('DemoBlockComponent', () => {
  let component: DemoBlockComponent;
  let fixture: ComponentFixture<DemoBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
