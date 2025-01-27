import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from "@angular/core";
import type { Task } from "../../interfaces/Task";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage-angular";

@Component({
	selector: "app-task-list",
	templateUrl: "./task-list.page.html",
	styleUrls: ["./task-list.page.scss"],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskListPage {
	public tasks: Task[] = [];
	private _router = inject(Router);
	private _storage = inject(Storage);

	async ngOnInit() {
		await this._storage.create();
		await this.getTaskData();
	}

	private async getTaskData(): Promise<void> {
		this.tasks = await this._storage.get("tasks");
	}

	public openTask(taskId: number) {
		console.log("Open task", taskId);
	}

	public createTask() {
		this._router.navigateByUrl("/task-create");
	}
}
