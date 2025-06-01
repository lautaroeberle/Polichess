import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaNoticiaComponent } from './carta-noticia.component';

describe('CartaNoticiaComponent', () => {
  let component: CartaNoticiaComponent;
  let fixture: ComponentFixture<CartaNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaNoticiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
