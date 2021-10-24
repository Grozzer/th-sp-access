import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';
import { SPComponentLoader } from '@microsoft/sp-loader';

import {FontMap, FontModule,IFontMap,IFontModule} from './FontModule';

import styles from './TrustedHelpAccessibilityToolApplicationCustomizer.module.scss';

import {escape} from '@microsoft/sp-lodash-subset';

import * as strings from 'TrustedHelpAccessibilityToolApplicationCustomizerStrings';

const LOG_SOURCE: string = 'TrustedHelpAccessibilityToolApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ITrustedHelpAccessibilityToolApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
  Top: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class TrustedHelpAccessibilityToolApplicationCustomizer
  extends BaseApplicationCustomizer<ITrustedHelpAccessibilityToolApplicationCustomizerProperties> {

  private _topPlaceholder: PlaceholderContent | undefined;
  public fontMapping: Array<IFontMap>;
  private fontModule: IFontModule;

  @override
  public onInit(): Promise<void> {
    
    const fontsInit = [{name: "Arial", value: "arial"}, {name: "OpenDyslexic", value: "opendyslexic"}, {name: "Verdana", value: "verdana"}];
    this.fontMapping = fontsInit.map(font => new FontMap(font.name, font.value))

    this.fontModule = new FontModule(this.fontMapping);

    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    // Wait for the placeholders to be created (or handle them being changed) and then
    // render.
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    return Promise.resolve();
  }

  private _renderPlaceHolders(): void {

    // Handling the top placeholder
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );
  
      if (this.properties) {  
        if (this._topPlaceholder.domElement) {
          this.fontModule.renderButtons(this._topPlaceholder.domElement);
        }
      }
    }
  }

  private _onDispose(): void {
    console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }
}
