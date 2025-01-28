import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from "@angular/core";
import {
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { Storage } from "@ionic/storage-angular";
import { CATEGORIES } from "src/app/constants/categories";
import type { Task } from "../../interfaces/Task";

@Component({
	selector: "app-task-create",
	templateUrl: "./task-create.page.html",
	styleUrls: ["./task-create.page.scss"],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	imports: [IonicModule, FormsModule, ReactiveFormsModule],
})
export class TaskCreatePage {
	public taskFormGroup!: FormGroup;
	public taskStatus: Task["status"][] = ["À faire", "En cours", "Terminé"];
	public categories = CATEGORIES;

	private _router = inject(Router);
	private _storage = inject(Storage);

	async ngOnInit() {
		const fb = new FormBuilder();
		this.taskFormGroup = this.initFormGroup(fb);
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

	private initFormGroup(fb: FormBuilder): FormGroup {
		return fb.group({
			id: [0],
			title: ["", Validators.required],
			status: ["À faire", Validators.required],
			category: [this.categories[0].name, Validators.required],
			endDate: ["", Validators.required],
		});
	}

	public async createTask() {
		if (this.taskFormGroup.invalid) {
			this.taskFormGroup.markAllAsTouched();
			return;
		}

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
