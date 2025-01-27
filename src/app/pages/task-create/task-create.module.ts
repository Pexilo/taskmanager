import { CommonModule } from "@angular/common";
import { NgModule, forwardRef } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TaskCreatePageRoutingModule } from "./task-create-routing.module";

import { TaskCreatePage } from "./task-create.page";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		TaskCreatePageRoutingModule,
		TaskCreatePage,
	],
})
export class TaskCreatePageModule {}
