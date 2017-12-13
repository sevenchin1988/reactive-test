import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup,FormGroupName,FormArrayName } from '@angular/forms';

@Component({
	selector:'form-input-text',
	template:`
		<div 
			class="dynamic-form-field form-text"
			[formGroup]="group">
			<label>{{config.label}}</label>
			<div *ngIf="!arrayName; else groupField">
				<input 
					type="text"
					[attr.placeholder]="config.placeholder"
					[attr.value]="config.name"
					[formControlName]="config.name" />
			</div>
			<ng-template #groupField>
				<div [formArrayName]="arrayName">
					<div [formGroupName]="groupName" >
						<input 
						type="text"
						[attr.placeholder]="config.placeholder"
						[attr.value]="config.name"
						[formControlName]="config.name" />
					</div>
				</div>
			</ng-template>
		</div>
	`
})
export class FormInputComponent {
	config;
	group:FormGroup;
	arrayName:FormArrayName;
	groupName:FormGroupName;
}