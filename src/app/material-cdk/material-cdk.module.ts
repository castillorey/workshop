import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Material
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon'
import { DragDropModule } from '@angular/cdk/drag-drop';

const components = [MatToolbarModule, MatIconModule, DragDropModule]  
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    components
  ],
  exports: components
})
export class MaterialCdkModule { }
