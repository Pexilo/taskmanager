import { Component, inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { CATEGORIES } from "src/app/constants/categories";
import type { Task } from "../../interfaces/Task";
import { TaskService } from "src/app/services/task.service";

@Component({
	selector: "app-task-create",
	templateUrl: "./task-create.page.html",
	styleUrls: ["./task-create.page.scss"],
	standalone: false,
})
export class TaskCreatePage {
	public taskFormGroup!: FormGroup;
	public taskStatus: Task["status"][] = ["À faire", "En cours", "Terminé"];
	public categories = CATEGORIES;

	private _router = inject(Router);
	private _taskService = inject(TaskService);

	async createTask(taskData: Omit<Task, "id">) {
		try {
			await this._taskService.addTask(taskData);
			this._router.navigateByUrl("/task-list");
		} catch (error) {
			console.error("Error creating task:", error);
		}
	}

	goBack() {
		this._router.navigateByUrl("/task-list");
	}
}
