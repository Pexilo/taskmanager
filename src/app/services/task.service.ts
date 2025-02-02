import { Injectable, inject } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { Status, Task } from "../interfaces/Task";
import { AlertUtils } from "../utils/alert.utils";
import { HttpClient } from "@angular/common/http";
import { Geolocation } from "@capacitor/geolocation";

@Injectable({
	providedIn: "root",
})
export class TaskService {
	private _http = inject(HttpClient);
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
		const position = await Geolocation.getCurrentPosition();
		const locationName = await this.getLocationName(
			position.coords.latitude,
			position.coords.longitude,
		);

		const tasks = await this.getTasks();
		const lastId = tasks.length > 0 ? tasks[tasks.length - 1].id : 0;

		const newTask: Task = {
			...taskData,
			id: lastId + 1,
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
			locationName,
		};

		tasks.push(newTask);
		await this._storage.set("tasks", tasks);
		return newTask;
	}

	private async getLocationName(lat: number, lng: number): Promise<string> {
		const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
		const response = await this._http.get<any>(url).toPromise();
		return response.address.city || response.address.country;
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
					const tasks = await this.getTasks();
					const archivedTasks = await this.getArchivedTasks();

					const taskIndex = tasks.findIndex((t) => t.id === taskId);
					if (taskIndex === -1) return;
					tasks[taskIndex].archived = true;

					const updatedTasks = [...tasks];
					const [archivedTask] = updatedTasks.splice(taskIndex, 1);

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
