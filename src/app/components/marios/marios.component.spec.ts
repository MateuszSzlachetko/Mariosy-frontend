import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MariosComponent } from './marios.component';

describe('MariosComponent', () => {
  let component: MariosComponent;
  let fixture: ComponentFixture<MariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MariosComponent]
    });
    fixture = TestBed.createComponent(MariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
