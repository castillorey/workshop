import { Component, OnInit } from '@angular/core';
import { ListSchema, TaskSchema } from 'src/app/core';
import { ApiService, TaskService } from 'src/app/core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  taskList: TaskSchema[];

  constructor(
    private apiService: ApiService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {}

  getPrioritiesTask(priorityType: string): void {
    this.taskService.getBoardList$.subscribe(
      (response: ListSchema[]) => {
        const lists = response;
        let tasks: TaskSchema[] = [];
        lists.map((element: ListSchema) => {
          element.tasks.map((task: TaskSchema) => {
            if (task.priority == priorityType) {
              tasks.push(task);
            }
          });
        });
        this.taskList = tasks;
      },
      (error: string) => console.log('Ups! we have an error: ', error)
    );
  }
}
