import { Component, Input, OnInit } from '@angular/core';
import { TaskSchema } from 'src/app/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {
  @Input() task: TaskSchema;

  constructor() { }

  ngOnInit(): void {
  }

}
