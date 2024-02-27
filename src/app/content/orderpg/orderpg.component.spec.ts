import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderpgComponent } from './orderpg.component';

describe('OrderpgComponent', () => {
  let component: OrderpgComponent;
  let fixture: ComponentFixture<OrderpgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderpgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderpgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
