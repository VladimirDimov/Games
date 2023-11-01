import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombineLatestPlayComponent } from './combine-latest-play.component';

describe('CombineLatestPlayComponent', () => {
  let component: CombineLatestPlayComponent;
  let fixture: ComponentFixture<CombineLatestPlayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CombineLatestPlayComponent]
    });
    fixture = TestBed.createComponent(CombineLatestPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
