import { ChangeDetectorRef, Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ViewDidEnter, ViewWillEnter } from "@ionic/angular";
import { Storage } from "@ionic/storage-angular";
import type { Status, Task } from "../../interfaces/Task";
import { TaskService } from "src/app/services/task.service";

@Component({
	selector: "app-task-list",
	templateUrl: "./task-list.page.html",
	styleUrls: ["./task-list.page.scss"],
	standalone: false,
})
export class TaskListPage implements ViewDidEnter {
	public tasks: Task[] = [];
	public archivedTasks: Task[] = [];
	public showArchives = false;

	private _router = inject(Router);
	private _taskService = inject(TaskService);

	async ngOnInit() {
		this.loadTasks();
	}

	async ionViewDidEnter() {
		this.loadTasks();
	}

	refreshTasks() {
		this.loadTasks();
	}

	private async loadTasks() {
		this.tasks = await this._taskService.getTasks();
		this.archivedTasks = await this._taskService.getArchivedTasks();
	}

	public createTask() {
		this._router.navigateByUrl("/task-create");
	}

	public toggleArchives() {
		this.showArchives = !this.showArchives;
	}
}
