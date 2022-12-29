import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/internal/operators/take';
import { TaskSchema } from 'src/app/core';

type DropdownObject = {
  value: string;
  viewValue: string;
};

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.sass']
})

export class CreateTaskComponent implements OnInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @Input() connectedOverlay: CdkConnectedOverlay;
  @Input() task?: TaskSchema;
  formText: string;
  
  taskForm: FormGroup;
  selectedPriority: string;

  priorities: DropdownObject[] = [
    { value: 'urgent', viewValue: 'Urgente' },
    { value: 'moderate', viewValue: 'Moderado' },
    { value: 'low', viewValue: 'Bajo' },
  ];
  
  constructor(private fb: FormBuilder, private _ngZone: NgZone) { }

  ngOnInit(): void {
    this.setForm();
    this.selectedPriority = '';
    if (this.task && this.task.id.length > 0) {
      this.setValuesOnForm(this.task);
      this.formText = 'Editar';
      this.selectedPriority = this.task.priority;
    } else {
      this.formText = 'Crear';
    }
  }
  
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  setForm(): void {
    this.taskForm = this.fb.group({
      date: [new Date(), Validators.required],
      priority: ['urgent', Validators.required],
      description: ['', Validators.required],
    });
  }

  onFormAdd(form: TaskSchema): void {
    if (this.taskForm.valid)
      console.log('valid');
    else
      console.log('edited');
    this.close();
  }

  setValuesOnForm(form: TaskSchema): void {
    this.taskForm.setValue({
      date: new Date(form.date),
      priority: form.priority,
      description: form.description 
   });
  }

  close(): void {
    this.connectedOverlay.overlayRef.detach();
  }
  
}
