export type Status = "À faire" | "En cours" | "Terminé";
export interface Task {
	id: number;
	title: string;
	status: Status;
	category: string;
	endDate: string;
	archived: boolean;
	createdAt: Date;
	latitude?: number;
	longitude?: number;
	locationName?: string;
}
