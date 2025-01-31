import { Component } from "@angular/core";
import { Geolocation } from "@capacitor/geolocation";

@Component({
	selector: "app-root",
	templateUrl: "app.component.html",
	styleUrls: ["app.component.scss"],
	standalone: false,
})
export class AppComponent {
	async initializeApp() {
		this.checkLocationPermissions();
	}

	private async checkLocationPermissions() {
		const status = await Geolocation.checkPermissions();

		if (status.location !== "granted") {
			await Geolocation.requestPermissions();
		}
	}
}
