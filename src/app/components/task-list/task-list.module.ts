import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TaskListPageRoutingModule } from "./task-list-routing.module";

import { TaskListPage } from "./task-list.page";
import { TaskCardPageModule } from "../task-card/task-card.module";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		TaskListPageRoutingModule,
		TaskCardPageModule,
	],
	declarations: [TaskListPage],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskListPageModule {}
