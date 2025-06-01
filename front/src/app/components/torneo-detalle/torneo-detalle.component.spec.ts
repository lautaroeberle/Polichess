import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneoDetalleComponent } from './torneo-detalle.component';

describe('TorneoDetalleComponent', () => {
  let component: TorneoDetalleComponent;
  let fixture: ComponentFixture<TorneoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TorneoDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorneoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
