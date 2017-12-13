import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormButtonComponent  } from '../form-button/form-button.component';
import { FormInputComponent   } from '../form-input/form-input.component';
import { FormSelectComponent   } from '../form-select/form-select.component';

//Definition for input type. This defination will use to dynamically create magic obj.
const components = {
  button: FormButtonComponent,
  text: FormInputComponent,
  select: FormSelectComponent
};

@Directive({
	selector:'[dynamicGroupFields]'
})
export class DynamicGroupFieldsDirective implements OnInit {
	@Input()
	config;

	@Input()
	group:FormGroup;
	
	constructor(
		private resolver: ComponentFactoryResolver,
		private container: ViewContainerRef
	) {}
	
	components = [];
	componentsBtn = [];
	ngOnInit() {
        var index =1;
        this.config.forEach(control => {
            const component = components[control.type];
            const factory = this.resolver.resolveComponentFactory<any>(component);
            this.components.push(this.container.createComponent(factory));
            console.log(this.components.length);
            this.components[this.components.length-1].instance.config = control;
            this.components[this.components.length-1].instance.group = this.group;
        });
	}
}