import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { ListSchema, TaskSchema } from 'src/app/core';
import { ApiService } from 'src/app/core/services';

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
  isOverlayDisplayed = false;
  task: TaskSchema;

  readonly overlayOptions: Partial<CdkConnectedOverlay> = {
    hasBackdrop: true,
    positions: [
      { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'top' },
    ],
  };

  constructor(private apiService: ApiService) {
    this.lists = [];
    this.task = initialValue;
  }

  ngOnInit(): void {
    this.getDataList();
  }

  getDataList(): void {
    this.apiService.getApi().subscribe(
      (response: any) => (this.lists = response['list']),
      (error) => console.log('Ups! we have an error: ', error)
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
    } else {
      this.task = initialValue;
    }
  }

  hideOverlay(): void {
    this.isOverlayDisplayed = false;
  }
}
