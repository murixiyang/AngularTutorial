import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighOrderMapComponent } from './high-order-map.component';

describe('HighOrderMapComponent', () => {
  let component: HighOrderMapComponent;
  let fixture: ComponentFixture<HighOrderMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighOrderMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighOrderMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
