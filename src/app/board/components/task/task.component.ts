import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListSchema, TaskSchema } from 'src/app/core';
import { TaskService } from 'src/app/core/services';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass'],
})
export class TaskComponent implements OnInit {
  @Input() task: TaskSchema;
  @Input() list?: ListSchema;
  
  @Output() editTask: EventEmitter<TaskSchema> = new EventEmitter();

  constructor(public dialog: MatDialog, public tasksService: TaskService) {}

  ngOnInit(): void {}

  handleEditTask(task: TaskSchema) {
    this.editTask.emit(task);
  }

  removeTask(taskId: string): void {
    console.log('Eliminar tarea', taskId);
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (this.list) {
        this.tasksService.removeTask(taskId, this.list);
      }
    });
  }
}
