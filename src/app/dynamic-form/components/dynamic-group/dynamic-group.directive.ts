import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup,FormArray,FormArrayName } from '@angular/forms';

import { FormButtonComponent  } from '../form-button/form-button.component';
import { FormInputComponent   } from '../form-input/form-input.component';
import { FormSelectComponent   } from '../form-select/form-select.component';
import { DynamicGroupArrayComponent } from '../dynamic-group-array/dynamic-group-array.component';
//Definition for input type. This defination will use to dynamically create magic obj.
const components = {
  button: FormButtonComponent,
  text: FormInputComponent,
  select: FormSelectComponent,
  group: DynamicGroupArrayComponent
};

@Directive({
	selector:'[dynamicField]'
})
export class DynamicFieldDirective implements OnInit {
	@Input()
	config;
	@Input()
	formArrayName:FormArrayName;
	@Input()
	group:FormGroup;
	
	constructor(
		private resolver: ComponentFactoryResolver,
		private container: ViewContainerRef
	) {}
	
	component;
	componentBtn;
	ngOnInit() {
		console.log(this.config);
		if(this.config.group != null) {
			
			const component = components["group"];
			const factory = this.resolver.resolveComponentFactory<any>(component);
			this.component = this.container.createComponent(factory);
			this.component.instance.formArrayName = this.formArrayName;
		}else {
			const component = components[this.config.type];
			const factory = this.resolver.resolveComponentFactory<any>(component);
			this.component = this.container.createComponent(factory);
		}
		this.component.instance.config = this.config;
		this.component.instance.group = this.group;
	}
}