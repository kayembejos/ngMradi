import { Component } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';

@Component({
  selector: 'app-home',
  imports: [ToolbarComponent],
  template: ` <app-toolbar /> `,
  styles: ``,
})
export default class HomeComponent {}
