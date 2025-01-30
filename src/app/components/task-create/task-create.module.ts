import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TaskCreatePageRoutingModule } from "./task-create-routing.module";

import { TaskCreatePage } from "./task-create.page";
import { TaskFormPageModule } from "../task-form/task-form.module";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ReactiveFormsModule,
		TaskCreatePageRoutingModule,
		TaskFormPageModule,
	],
	declarations: [TaskCreatePage],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskCreatePageModule {}
