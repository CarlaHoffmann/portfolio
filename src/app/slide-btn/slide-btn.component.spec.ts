import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideBtnComponent } from './slide-btn.component';

describe('SlideBtnComponent', () => {
  let component: SlideBtnComponent;
  let fixture: ComponentFixture<SlideBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlideBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
