type Status = "À faire" | "En cours" | "Terminé";
export interface Task {
	id: number;
	title: string;
	status: Status;
}
