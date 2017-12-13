import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { DynamicFormComponent } from './containers/dynamic-form/dynamic-form.component';


import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { DynamicGroupFieldsDirective } from './components/dynamic-group-fields/dynamic-group-fields.directive';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { DynamicGroupArrayComponent } from './components/dynamic-group-array/dynamic-group-array.component';
@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule
	],
	declarations: [
		DynamicFieldDirective,
		DynamicGroupFieldsDirective,
		DynamicFormComponent,
		DynamicGroupArrayComponent,
		FormButtonComponent,
		FormInputComponent,
		FormSelectComponent
	],
	exports: [
		DynamicFormComponent,
	],
	entryComponents: [
		FormButtonComponent,
		FormInputComponent,
		FormSelectComponent,
		DynamicGroupArrayComponent
	]
})
export class DynamicFormModule{
	
}