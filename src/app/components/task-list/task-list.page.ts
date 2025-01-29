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
export class TaskListPage implements ViewWillEnter {
	public tasks: Task[] = [];
	public archivedTasks: Task[] = [];
	public showArchives = false;

	private _cdr = inject(ChangeDetectorRef);
	private _router = inject(Router);
	private _taskService = inject(TaskService);

	async ngOnInit() {
		this.loadTasks();
	}

	async ionViewWillEnter() {
		this.loadTasks();
	}

	private async loadTasks() {
		this.tasks = await this._taskService.getTasks();
		this.archivedTasks = await this._taskService.getArchivedTasks();

		this._cdr.detectChanges();
		console.log("Tasks updated:", this.tasks);
	}

	public createTask() {
		this._router.navigateByUrl("/task-create");
	}

	public async archiveTask(taskId: number) {
		await this._taskService.archiveTask(taskId);
		await this.loadTasks();
	}

	public async updateTaskStatus(taskId: number, newStatus: Status) {
		await this._taskService.updateTaskStatus(taskId, newStatus);
		await this.loadTasks();
	}

	public toggleArchives() {
		this.showArchives = !this.showArchives;
	}
}
