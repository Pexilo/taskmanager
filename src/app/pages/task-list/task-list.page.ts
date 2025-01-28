import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ViewWillEnter } from "@ionic/angular";
import { Storage } from "@ionic/storage-angular";
import { CATEGORIES } from "src/app/constants/categories";
import { STATUS } from "src/app/constants/status";
import type { Status, Task } from "../../interfaces/Task";
import { AlertUtils } from "../../utils/alert.utils";

type StatusEmoji = {
	emoji: string;
	color: string;
};
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

	public getStatusEmoji(status: Task["status"]): StatusEmoji {
		const statusData = STATUS.find((stat) => stat.name === status);
		return {
			emoji: statusData ? statusData.emoji : "",
			color: statusData ? statusData.color : "#CCCCCC",
		};
	}

	public getCategoryColor(categoryName: string): string {
		const category = CATEGORIES.find((cat) => cat.name === categoryName);
		return category ? category.color : "#CCCCCC";
	}

	public getDaysRemaining(endDate: string): number | string {
		const today = new Date();
		const end = new Date(endDate);
		const timeDiff = end.getTime() - today.getTime();
		const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
		if (daysRemaining < 0) {
			return "Expiré";
		}
		if (daysRemaining === 0) {
			return "Expire aujourd'hui";
		}
		return daysRemaining;
	}

	public isDueSoon(daysRemaining: number | string): boolean {
		if (typeof daysRemaining === "string") {
			return true;
		}
		return false;
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

	public async updateTaskStatus(
		taskId: number,
		newStatus: Status,
	): Promise<void> {
		const task = this.tasks.find((t) => t.id === taskId);
		if (task) {
			task.status = newStatus;
			await this._storage.set("tasks", this.tasks);
		}
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
