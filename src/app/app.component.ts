import { Component,ViewChild} from '@angular/core';
import { DynamicFormComponent } from './dynamic-form/containers/dynamic-form/dynamic-form.component';
@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <dynamic-form [config]="config" #form="dynamicForm"
        (submit)="submit($event)"></dynamic-form>
  </div>`
})
export class AppComponent { 
	config=step1;
	@ViewChild(DynamicFormComponent) form: DynamicFormComponent;
	submit(value: {[name: string]: any}) {
		this.form.setConfig(step2);
		this.form.reset();
	}
}


const step1 = [
	
	{
		type:"text",
		label:"Team",
		name:"team",
		placeholder:"Enter your team",
		isGroup:false
	},
	{
		type:"text",
		label:"CPU Size",
		name:"cpu",
		placeholder:"Enter number of cpu core",
		isGroup:false
	},
	{
		type:"text",
		label:"Memory Size",
		name:"memory",
		placeholder:"Enter size of Memory",
		multiple:true,
		isGroup:false
	},
	{
		type:"text",
		label:"Disk Size",
		name:"disk",
		placeholder:"Enter size of disk",
		multiple:true,
		isGroup:false
	},
	{
		type:"select",
		label:"Location",
		name:"location",
		options: ['DC3', 'DC5', 'DC6', 'DC6e', 'DC7', 'DC7e'],
		placeholder:"Select location",
		isGroup:false
	},
	{
	  label: 'Next',
	  name: 'next',
	  type: 'button',
	  isGroup:false
	},{
		group:[
			{
				group:[
					{
						type:"text",
						label:"Source Machine name",
						name:"sourcemachinename",
						placeholder:"Enter machine name",
					},
					{
						type:"text",
						label:"Source Machine IP",
						name:"sourcemachineip",
						placeholder:"Enter machine ip",
					},
					{
						type:"text",
						label:"Source Machine owner",
						name:"sourcemachineowner",
						placeholder:"Enter machine owner",
					}
				],
				name:"sourceGroup",
				isGroup:true,
				type:'group'
			},
			{
				type:"text",
				label:"Machine IP",
				name:"machineIp",
				placeholder:"Enter machine ip",
				multiple:true,
			}
		],
		name:"machineGroup",
		isGroup:true,
		type:'group'
	}
];

const step2 = [
	{
		type:"text",
		label:"Account",
		name:"account",
		placeholder:"Enter account",
		multiple:true
	},
	{
		type:"text",
		label:"Group",
		name:"group",
		placeholder:"Enter group"
	},
	{
		type:"text",
		label:"Home directory",
		name:"home",
		placeholder:"Enter home directory"
	},
	{
	  label: 'Submit',
	  name: 'submit',
	  type: 'button'
	}
];