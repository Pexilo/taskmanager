import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class RandomFactService {
	private apiUrl = "https://uselessfacts.jsph.pl/api/v2/facts/random";

	private _http = inject(HttpClient);

	getRandomFactMessage(): Observable<any> {
		return this._http.get(this.apiUrl);
	}
}
