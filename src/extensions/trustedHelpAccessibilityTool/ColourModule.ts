import styles from './TrustedHelpAccessibility-Colours.module.scss'

export interface IColourModule {
	renderControls(element: HTMLElement): void;
}

export class ColourModule implements IColourModule {
	renderControls(element: HTMLElement): void {
		
		const hc1 = document.createElement("button");
		hc1.textContent = "Dark Mode";
		hc1.addEventListener("click", (e: Event) => this.toggleDarkMode())
		element.appendChild(hc1);
	}

	private toggleDarkMode(): void {
		const docBody = document.querySelector("body");
		docBody.classList.toggle(styles.access_colour_highContrast_bw);
	}
}