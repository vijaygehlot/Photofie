import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearcheditemComponent } from './searcheditem.component';

describe('SearcheditemComponent', () => {
  let component: SearcheditemComponent;
  let fixture: ComponentFixture<SearcheditemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearcheditemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearcheditemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
