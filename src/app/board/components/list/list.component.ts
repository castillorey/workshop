import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListSchema, TaskSchema } from 'src/app/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  @Input() list: ListSchema | undefined;
  @Output() editTask: EventEmitter<TaskSchema> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<TaskSchema[]| any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  handleEdit(task: TaskSchema){
    this.editTask.emit(task)
  }
}
