type Status = "Todo" | "Pending" | "Done";
export interface Task {
	id: number;
	title: string;
	status: Status;
}
