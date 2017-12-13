import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup,FormArray,FormArrayName,FormGroupName } from '@angular/forms';

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
	arrayName:FormArrayName;
	@Input()
	groupName:FormGroupName;
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
		console.log("arrayName");
		console.log(this.arrayName);
		if(this.config.type != undefined) {
			if(this.arrayName != null) {
					const component = components[this.config.type];
					const factory = this.resolver.resolveComponentFactory<any>(component);
					this.component = this.container.createComponent(factory);
					this.component.instance.arrayName = this.arrayName;
					this.component.instance.groupName = this.groupName;
			}else {
				const component = components[this.config.type];
				const factory = this.resolver.resolveComponentFactory<any>(component);
				this.component = this.container.createComponent(factory);
			}
			this.component.instance.config = this.config;
			this.component.instance.group = this.group;
		}
	}
}