import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TaskListPageModule } from './pages/task-list/task-list.module';

const routes: Routes = [
  { path: '', redirectTo: 'task-list', pathMatch: 'full' },
  {
    path: 'task-list',
    loadChildren: () => TaskListPageModule,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
