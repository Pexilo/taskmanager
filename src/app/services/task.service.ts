import { Injectable, inject } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { Status, Task } from "../interfaces/Task";
import { AlertUtils } from "../utils/alert.utils";

@Injectable({
	providedIn: "root",
})
export class TaskService {
	private _storage = inject(Storage);
	private _alertUtils = inject(AlertUtils);

	constructor() {
		this.initializeStorage();
	}

	private async initializeStorage() {
		await this._storage.create();
	}

	async getTasks(): Promise<Task[]> {
		return (await this._storage.get("tasks")) || [];
	}

	async getArchivedTasks(): Promise<Task[]> {
		return (await this._storage.get("archivedTasks")) || [];
	}

	async addTask(taskData: Omit<Task, "id">): Promise<Task> {
		const tasks = await this.getTasks();
		const lastId = tasks.length > 0 ? tasks[tasks.length - 1].id : 0;
		const newTask: Task = { ...taskData, id: lastId + 1 };
		tasks.push(newTask);
		await this._storage.set("tasks", tasks);
		return newTask;
	}

	async deleteTask(taskId: number): Promise<void> {
		const tasks = await this.getTasks();
		const newTasks = tasks.filter((t) => t.id !== taskId);
		await this._storage.set("tasks", newTasks);
	}

	async updateTaskStatus(taskId: number, newStatus: Status): Promise<void> {
		const tasks = await this.getTasks();
		const newTasks = tasks.map((task) =>
			task.id === taskId ? { ...task, status: newStatus } : task,
		);
		await this._storage.set("tasks", newTasks);
	}

	public async archiveTask(taskId: number): Promise<void> {
		return new Promise((resolve) => {
			this._alertUtils.showConfirmationAlert(
				"Confirmer l'archivage",
				"Voulez-vous vraiment archiver cette tâche ?",
				async () => {
					// Get fresh copies
					const tasks = await this.getTasks();
					const archivedTasks = await this.getArchivedTasks();

					// Find task index
					const taskIndex = tasks.findIndex((t) => t.id === taskId);
					if (taskIndex === -1) return;

					// Create new arrays
					const updatedTasks = [...tasks];
					const [archivedTask] = updatedTasks.splice(taskIndex, 1);

					// Update storage atomically
					await Promise.all([
						this._storage.set("tasks", updatedTasks),
						this._storage.set("archivedTasks", [
							...archivedTasks,
							archivedTask,
						]),
					]);

					resolve();
				},
			);
		});
	}
}
