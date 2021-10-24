import styleFonts from './TrustedHelpAccessibility-Fonts.module.scss';
require('./TrustedHelpAccessibility-Fonts.module.scss');
export interface IFontMap {
	name: string;
	value: string;
}

export interface IFontModule {
	fonts: Array<IFontMap>;

	getFonts(): any;
	addFonts(IFontMap): void;

	renderButtons(element: HTMLElement): void;
	
	selectFontByName(fontName: string): void;
	selectFont(font: IFontMap): void;
}

export class FontModule implements IFontModule {
	fonts: IFontMap[];

	constructor(fonts: IFontMap[]) {
				this.fonts = fonts;
	}
	
	getFonts() {
		return this.fonts.map(font => font.name);
	}
	addFonts(IFontMap: any): void {
		throw new Error("Method not implemented.");
	}
	renderButtons(element: HTMLElement): void {
		for (let i = 0; i < this.fonts.length; i++) {
			const font = this.fonts[i];
			const fontSelect = document.createElement("button");
			fontSelect.textContent = font.name;
			fontSelect.addEventListener("click", (e:Event) => this.selectFont(font));
			//btn.addEventListener("click", (e:Event) => this.getTrainingName(4))
			element.appendChild(fontSelect);
		}
	}
	
	selectFontByName(fontName: string): void {};
	selectFont(font: IFontMap): void {
		const docBody = document.querySelector("body");
		docBody.classList.add(`access_font_${font.value}`);
	};
}