import { NgModule } from "@angular/core";
import type { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";

import { TaskCreatePage } from "./task-create.page";

const routes: Routes = [
	{
		path: "",
		component: TaskCreatePage,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TaskCreatePageRoutingModule {}
