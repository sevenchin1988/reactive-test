import { Component, Input, OnInit,EventEmitter, OnChanges,  Output } from '@angular/core';
import {FormGroup, FormBuilder,FormArray,FormControl } from '@angular/forms';

@Component({
	exportAs: 'dynamicForm',
	selector: 'dynamic-form',
	template: `
		<form 
			class="dynamic-form"
			[formGroup]="form" (submit)="handleSubmit($event)">
			<ng-container *ngFor="let field of config;">
				<dynamic-group-array *ngIf="field.isGroup" [field]="field" [form]="form"></dynamic-group-array>
				<div *ngIf="!field.isGroup">
					<ng-container dynamicField [config]="field" [group]="form"></ng-container>
				</div>
			</ng-container>
		</form>
	`
})
export class DynamicFormComponent implements OnInit {
	@Input()
	config: any[] = [];
	@Output()
	submit: EventEmitter<any> = new EventEmitter<any>();
  
	form: FormGroup;
	get value() { return this.form.value; }

	multi= {};
	constructor(private fb: FormBuilder) {}
	
	ngOnInit() {
		this.form = this.createGroup();
	}
	reset()  {
		this.form = this.createGroup();
		console.log("form");
		console.log(this.form);
	}
	setConfig(config) {
		this.config = config;
		this.reset();
	}
	createGroup(inConfig=null): FormGroup {
		const group = this.fb.group({});
		let _config = inConfig==null? this.config:inConfig.group;
		_config.forEach(control => {
			if(control.isGroup){ //if control is a group control
				let obj = this.createGroup(control);
				group.setControl(control.name,this.fb.array([obj]));		
			}else {
				if(control.multiple) {
					group.addControl(control.name,this.createControlGroup(control));
				}
				else {
					group.addControl(control.name,this.createControlGroup(control));
				}
			}
		});
		return group;
	}
	ngOnChanges() {
	}
	
	createControlGroup(control) {
		const { disabled, validation, value } = control;
		var c = this.fb.control({ disabled, value }, validation);
		return c;
	}
	createArray(config) {
		var c = this.fb.array(config.group);
		return c;
	}
	handleSubmit(event: Event) {
		event.preventDefault();
		event.stopPropagation();
		this.submit.emit(this.value);

	}
}

/*
<div *ngIf="field.isGroup"  [formArrayName]="field.name">
					<div [formGroupName]="0" >
					<input  *ngFor="let gc of field.group;"
					type="text"
					[attr.placeholder]="gc.placeholder"
					[attr.value]="gc.name"
					[attr.name]="gc.name"
					[formControlName]="gc.name" />
					
					</div>
				</div>
				<div *ngIf="field.isGroup"  [formArrayName]="field.name">
					<div [formGroupName]="1" >
					<input
					type="text"
					
					formControlName="machineIp" />
					</div>
				</div>
				<div *ngIf="field.isGroup"  [formArrayName]="field.name">
					<div [formGroupName]="1" >
					<input
					type="text"
					formControlName="machine" />
				</div>
				*/