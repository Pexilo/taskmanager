import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Task } from "../../interfaces/Task";
import { CATEGORIES } from "../../constants/categories";
import { Router } from "@angular/router";

@Component({
	selector: "app-task-form",
	templateUrl: "./task-form.page.html",
	styleUrls: ["./task-form.page.scss"],
	standalone: false,
})
export class TaskFormPage {
	@Input() initialValues: Partial<Task> = {};
	@Output() formSubmit = new EventEmitter<Task>();

	private _router = inject(Router);

	public taskForm: FormGroup;
	categories = CATEGORIES;
	statusList = ["À faire", "En cours", "Terminé"];

	constructor(private fb: FormBuilder) {
		this.taskForm = this.fb.group({
			title: ["", Validators.required],
			status: ["À faire", Validators.required],
			category: [this.categories[0]?.name, Validators.required],
			endDate: ["", Validators.required],
		});
	}

	ngOnChanges() {
		if (this.initialValues) {
			this.taskForm.patchValue(this.initialValues);
		}
	}

	onSubmit() {
		if (this.taskForm.invalid) {
			this.taskForm.markAllAsTouched();
			return;
		}
		this.formSubmit.emit(this.taskForm.value);
		this._router.navigateByUrl("/task-list");
	}
}
