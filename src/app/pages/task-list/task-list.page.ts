import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ViewWillEnter } from "@ionic/angular";
import { Storage } from "@ionic/storage-angular";
import { CATEGORIES } from "src/app/constants/categories";
import type { Task } from "../../interfaces/Task";
import { AlertUtils } from "../../utils/alert.utils";

@Component({
	selector: "app-task-list",
	templateUrl: "./task-list.page.html",
	styleUrls: ["./task-list.page.scss"],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskListPage implements ViewWillEnter {
	public tasks: Task[] = [];
	private _router = inject(Router);
	private _storage = inject(Storage);
	private _alertUtils = inject(AlertUtils);

	async ngOnInit() {
		await this._storage.create();
	}

	async ionViewWillEnter() {
		await this.getTaskData();
	}

	public getCategoryColor(categoryName: string): string {
		const category = CATEGORIES.find((cat) => cat.name === categoryName);
		return category ? category.color : "#CCCCCC";
	}

	private async getTaskData(): Promise<void> {
		this.tasks = (await this._storage.get("tasks")) || [];
	}

	public openTask(taskId: number) {
		console.log("Open task", taskId);
	}

	public createTask() {
		this._router.navigateByUrl("/task-create");
	}

	public async deleteTask(taskId: number) {
		this._alertUtils.showConfirmationAlert(
			"Confirmer la suppression",
			"Voulez-vous vraiment supprimer cette tâche ? Cette action est irréversible.",
			async () => {
				this.tasks = this.tasks.filter((task) => task.id !== taskId); // filtre les tâches pour ne pas inclure celle à supprimer
				await this._storage.set("tasks", this.tasks);
			},
		);
	}
}
