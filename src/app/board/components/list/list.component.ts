import { Component, Input, OnInit } from '@angular/core';
import { ListSchema } from 'src/app/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  @Input() list: ListSchema | undefined;
  
  constructor() { }

  ngOnInit(): void {
  }

}
