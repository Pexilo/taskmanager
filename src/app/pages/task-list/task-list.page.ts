import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

type Status = 'Todo' | 'Pending' | 'Done';
type Task = {
  id: string;
  title: string;
  status: Status;
};

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskListPage {
  public tasks: Task[] = [
    { id: '1', title: 'Coder le projet TaskManager', status: 'Todo' },
    { id: '2', title: 'Apprendre Ionic', status: 'Pending' },
    { id: '3', title: 'Apprendre Angular', status: 'Done' },
  ];

  public openTask(taskId: string) {
    console.log('Open task', taskId);
  }
}
