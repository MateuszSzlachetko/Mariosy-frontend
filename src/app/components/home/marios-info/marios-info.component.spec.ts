import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MariosInfoComponent } from './marios-info.component';

describe('MariosInfoComponent', () => {
  let component: MariosInfoComponent;
  let fixture: ComponentFixture<MariosInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MariosInfoComponent]
    });
    fixture = TestBed.createComponent(MariosInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
