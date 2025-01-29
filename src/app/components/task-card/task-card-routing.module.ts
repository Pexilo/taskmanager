import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskCardPage } from './task-card.page';

const routes: Routes = [
  {
    path: '',
    component: TaskCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskCardPageRoutingModule {}
