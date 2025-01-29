import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Task } from "../../interfaces/Task";
import { CATEGORIES } from "../../constants/categories";

@Component({
	selector: "app-task-form",
	templateUrl: "./task-form.component.html",
	styleUrls: ["./task-form.component.scss"],
	standalone: false,
})
export class TaskFormComponent {
	@Input() initialValues: Partial<Task> = {};
	@Output() formSubmit = new EventEmitter<Task>();

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
		if (this.taskForm.valid) {
			this.formSubmit.emit(this.taskForm.value);
		}
	}
}
