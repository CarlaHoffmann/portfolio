import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoInitialsComponent } from './logo-initials.component';

describe('LogoInitialsComponent', () => {
  let component: LogoInitialsComponent;
  let fixture: ComponentFixture<LogoInitialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoInitialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogoInitialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
