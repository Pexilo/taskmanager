import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCardPage } from './task-card.page';

describe('TaskCardPage', () => {
  let component: TaskCardPage;
  let fixture: ComponentFixture<TaskCardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
