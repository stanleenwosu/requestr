import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe, GetNamePipe } from './filter.pipe';

const pipes = [
  FilterPipe,
  GetNamePipe
]

@NgModule({
  declarations: [pipes],
  imports: [
    CommonModule
  ],
  exports:[pipes]
})
export class PipesModule { }
