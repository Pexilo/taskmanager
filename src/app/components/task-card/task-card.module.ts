import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TaskCardPageRoutingModule } from "./task-card-routing.module";

import { TaskCardPage } from "./task-card.page";

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, TaskCardPageRoutingModule],
	declarations: [TaskCardPage],
	exports: [TaskCardPage],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskCardPageModule {}
