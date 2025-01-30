import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class TechQuotesService {
	private apiUrl = "https://techy-api.vercel.app/api/json";

	private _http = inject(HttpClient);

	getTechQuoteMessage(): Observable<any> {
		return this._http.get(this.apiUrl);
	}
}
