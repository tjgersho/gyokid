import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseremailComponent } from './browseremail.component';

describe('BrowseremailComponent', () => {
  let component: BrowseremailComponent;
  let fixture: ComponentFixture<BrowseremailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseremailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseremailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
