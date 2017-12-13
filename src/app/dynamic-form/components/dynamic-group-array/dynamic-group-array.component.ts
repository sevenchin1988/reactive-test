import { Component, Input, OnInit,EventEmitter, OnChanges,  Output } from '@angular/core';
import { FormArray, FormArrayName,  FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'dynamic-group-array',
    //styleUrls: ['form-button.component.scss'],
    template: `
    <div 
      class="dynamic-form-field form-text"
      [formGroup]="form">
        {{field | json}}
        <div *ngFor="let fc of field.group; let i = index">
          <ng-container 
            dynamicField 
            [config]="fc"
            [group]="form"
            [arrayName]="field.name"
            [groupName]="i"
          ></ng-container>
          <div [formArrayName]="field.name" *ngIf="!fc.isGroup">
            <div [formGroupName]="i" >
              <dynamic-group-array *ngIf="fc.isGroup" [field]="fc" [form]="form"></dynamic-group-array>
            </div>
          </div>
        </div>
      </div>
    `
  })
  export class DynamicGroupArrayComponent {    
    @Input()
    field;
    @Input()
    form:FormGroup;
  }
  
