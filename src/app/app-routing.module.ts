import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule } from "@angular/router";
import { Routes } from "@angular/router";
import { TaskListPageModule } from "./components/task-list/task-list.module";
import { TaskCreatePageModule } from "./components/task-create/task-create.module";

const routes: Routes = [
	{ path: "", redirectTo: "task-list", pathMatch: "full" },
	{
		path: "task-list",
		loadChildren: () => TaskListPageModule,
	},
	{
		path: "task-create",
		loadChildren: () => TaskCreatePageModule,
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
