import { Component, OnInit } from '@angular/core';
import { ListSchema } from 'src/app/core';
import { ApiService } from 'src/app/core/services';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
  lists!: ListSchema[];
  constructor(private apiService: ApiService) { 
    this.lists = [];
  }

  ngOnInit(): void {
    this.getDataList();
  }

  getDataList(): void {
    this.apiService.getApi().subscribe(
      (response: any) => this.lists = response['list'],
      error => console.log('Ups! we have an error: ', error)
    );
  }
}
