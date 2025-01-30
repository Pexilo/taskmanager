import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TaskFormPageRoutingModule } from "./task-form-routing.module";

import { TaskFormPage } from "./task-form.page";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ReactiveFormsModule,
		TaskFormPageRoutingModule,
	],
	declarations: [TaskFormPage],
	exports: [TaskFormPage],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskFormPageModule {}
