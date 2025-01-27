import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from "@angular/core";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage-angular";
import type { Task } from "../../interfaces/Task";

@Component({
	selector: "app-task-create",
	templateUrl: "./task-create.page.html",
	styleUrls: ["./task-create.page.scss"],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	imports: [ReactiveFormsModule],
})
export class TaskCreatePage {
	public taskFormGroup!: FormGroup;
	public taskStatus: Task["status"][] = ["Todo", "Pending", "Done"];

	private _router = inject(Router);
	private _storage = inject(Storage);

	async ngOnInit() {
		const taskFG = new FormGroup({
			id: new FormControl<number>(0),
			title: new FormControl<string>("", Validators.required),
			status: new FormControl<Task["status"]>("Todo", Validators.required),
		});
		this.taskFormGroup = taskFG;
		await this._storage.create();
	}

	private async getTaskData(): Promise<Task[]> {
		const tasks = await this._storage.get("tasks");
		return tasks || [];
	}

	private async getLastTaskId(): Promise<number> {
		const taskData = await this.getTaskData();
		if (taskData.length === 0) return 1;
		const lastTask = taskData[taskData.length - 1];
		return lastTask.id + 1;
	}

	public async createTask() {
		const taskId = await this.getLastTaskId();
		const task = this.taskFormGroup.value;
		task.id = taskId;

		const tasks = await this.getTaskData();
		tasks.push(task);

		await this._storage.set("tasks", tasks);
		this._router.navigateByUrl("/task-list");
	}

	public goBack() {
		this._router.navigateByUrl("/task-list");
	}
}
