import { Component, Input, Output, EventEmitter, inject } from "@angular/core";
import { Task, Status } from "../../interfaces/Task";
import { CATEGORIES } from "../../constants/categories";
import { STATUS } from "../../constants/status";
import { TaskService } from "src/app/services/task.service";

@Component({
	selector: "app-task-card",
	templateUrl: "./task-card.page.html",
	styleUrls: ["./task-card.page.scss"],
	standalone: false,
})
export class TaskCardPage {
	@Input() task!: Task;

	categories = CATEGORIES;
	statusList = STATUS;

	private _taskService = inject(TaskService);

	getCategoryColor(categoryName: string): string {
		return (
			this.categories.find((c) => c.name === categoryName)?.color || "#CCCCCC"
		);
	}

	getStatusEmoji(status: string): { emoji: string; color: string } {
		return (
			this.statusList.find((s) => s.name === status) || {
				emoji: "",
				color: "#CCCCCC",
			}
		);
	}

	getDaysRemaining(endDate: string): number | string {
		const today = new Date();
		const end = new Date(endDate);
		const timeDiff = end.getTime() - today.getTime();
		const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

		if (daysRemaining < 0) return "Expiré";
		if (daysRemaining === 0) return "Expire aujourd'hui";
		return daysRemaining;
	}

	async updateStatus(newStatus: Status) {
		await this._taskService.updateTaskStatus(this.task.id, newStatus);
	}

	async archiveTask() {
		await this._taskService.archiveTask(this.task.id);
	}
}
