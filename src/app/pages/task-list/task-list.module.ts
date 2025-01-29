import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TaskListPageRoutingModule } from "./task-list-routing.module";

import { TaskListPage } from "./task-list.page";
import { TaskCardComponent } from "src/app/components/task-card/task-card.component";

@NgModule({
	declarations: [TaskCardComponent],
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		TaskListPageRoutingModule,
		TaskListPage,
	],
	exports: [TaskCardComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskListPageModule {}
