import { ChangeDetectorRef, Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ViewDidEnter, ViewWillEnter } from "@ionic/angular";
import { Storage } from "@ionic/storage-angular";
import type { Status, Task } from "../../interfaces/Task";
import { TaskService } from "src/app/services/task.service";
import { TechQuotesService } from "src/app/services/tech-quotes.service";

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
	public techQuoteMsg = "";

	private _router = inject(Router);
	private _taskService = inject(TaskService);
	private _techQuotesService = inject(TechQuotesService);

	async ngOnInit() {
		this.loadTasks();
		this.loadTechQuoteMsg();
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

	private async loadTechQuoteMsg() {
		this._techQuotesService.getTechQuoteMessage().subscribe((quote) => {
			this.techQuoteMsg = quote.message;
		});
	}

	public createTask() {
		this._router.navigateByUrl("/task-create");
	}

	public toggleArchives() {
		this.showArchives = !this.showArchives;
	}
}
