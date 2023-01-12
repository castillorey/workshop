import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { ListSchema, TaskSchema } from 'src/app/core';
import { ApiService, TaskService } from 'src/app/core/services';

const initialValue = {
  id: '',
  description: '',
  date: '',
  priority: '',
};

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass'],
})
export class BoardComponent implements OnInit {
  lists: ListSchema[];
  listId: string;
  isOverlayDisplayed = false;
  task: TaskSchema;

  readonly overlayOptions: Partial<CdkConnectedOverlay> = {
    hasBackdrop: true,
    positions: [
      { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'top' },
    ],
  };

  constructor(private apiService: ApiService, private taskService: TaskService) {
    this.lists = [];
    this.task = initialValue;
  }

  ngOnInit(): void {
    this.getDataStored();
  }

  getDataList(): void {
    this.apiService.getApi().subscribe(
      (response: any) => (this.lists = response['list']),
      (error: string) => console.log('Ups! we have an error: ', error)
    );
  }


  getDataStored(): void {
    this.taskService.getBoardList$
      .subscribe(
        (response: any) => this.lists = response,
        (error: string) => (console.log('Ups! we have an error: ', error))
    );
  }

  displayOverlay(event?: TaskSchema): void {
    this.isOverlayDisplayed = true;
    if (!!event) {
      this.task = {
        date: event.date,
        id: event.id,
        description: event.description,
        priority: event.priority,
      };
      
      if(event.listId){
        this.listId = event.listId;
      }
    } else {
      this.task = initialValue;
    }
  }

  hideOverlay(): void {
    this.isOverlayDisplayed = false;
  }
}
