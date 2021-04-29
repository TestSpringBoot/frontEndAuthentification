import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentaireListComponent } from './commentaire-list.component';

describe('CommentaireListComponent', () => {
  let component: CommentaireListComponent;
  let fixture: ComponentFixture<CommentaireListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentaireListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentaireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
