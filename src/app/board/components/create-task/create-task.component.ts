import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/internal/operators/take';
import { TaskSchema } from 'src/app/core';
import { TaskService } from 'src/app/core/services';
import { generateUniqueId } from 'src/app/shared/utils';

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
  @Input() listId?: string;

  formText: string;
  
  taskForm: FormGroup;
  selectedPriority: string;

  priorities: DropdownObject[] = [
    { value: 'urgent', viewValue: 'Urgente' },
    { value: 'moderate', viewValue: 'Moderado' },
    { value: 'low', viewValue: 'Bajo' },
  ];
  
  constructor(
    private fb: FormBuilder, 
    private _ngZone: NgZone,
    private tasksService: TaskService) { }

  ngOnInit(): void {
    this.setForm();
    this.selectedPriority = '';
    if (this.task?.id?.length > 0) {
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
    if (this.taskForm.valid && !this.task?.id){
      form.id = generateUniqueId();
      this.tasksService.addTask(form);
      console.log('valid');
    } else if(this.task && this.listId) {
      const findPriority = this.priorities.find(
        (element) => form.priority === element.value
      );
      form.id = this.task.id;
      form.priority = !findPriority ? this.task.priority : form.priority;
      form.date = new Date(form.date);
      
      if (form.priority) {
        this.tasksService.updateTask(form, this.listId);
      }
      console.log('edited');
    }
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
