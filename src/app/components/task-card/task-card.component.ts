import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Task, Status } from "../../interfaces/Task";
import { CATEGORIES } from "../../constants/categories";
import { STATUS } from "../../constants/status";

@Component({
	selector: "app-task-card",
	templateUrl: "./task-card.component.html",
	styleUrls: ["./task-card.component.scss"],
	standalone: false,
})
export class TaskCardComponent {
	@Input() task!: Task;
	@Output() statusUpdate = new EventEmitter<Status>();
	@Output() archive = new EventEmitter<void>();

	categories = CATEGORIES;
	statusList = STATUS;

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
}
