import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Injectable({
	providedIn: "root", // Permet de fournir le service à toute l'application
})
export class AlertUtils {
	constructor(private alertController: AlertController) {}

	/**
	 * Affiche une alerte de confirmation.
	 *
	 * @param {string} header - Le haut de l'alerte.
	 * @param {string} message - Le message de l'alerte.
	 * @param {() => void} confirmHandler - La fonction à exécuter lors de la confirmation.
	 * @returns {Promise<void>}
	 */
	async showConfirmationAlert(
		header: string,
		message: string,
		confirmHandler: () => void,
	): Promise<void> {
		const alert = await this.alertController.create({
			header,
			message,
			buttons: [
				{
					text: "Annuler",
					role: "cancel",
				},
				{
					text: "Supprimer",
					handler: confirmHandler,
				},
			],
		});

		await alert.present();
	}
}
