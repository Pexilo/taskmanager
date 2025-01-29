import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, forwardRef } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TaskCreatePageRoutingModule } from "./task-create-routing.module";

import { TaskCreatePage } from "./task-create.page";
import { TaskFormComponent } from "src/app/components/task-form/task-form.component";

@NgModule({
	declarations: [TaskFormComponent],
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		TaskCreatePageRoutingModule,
		TaskCreatePage,
		ReactiveFormsModule,
	],
	exports: [TaskFormComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskCreatePageModule {}
