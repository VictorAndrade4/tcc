import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AreaDto, DataService } from '../data.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css'],
})
export class DragAndDropComponent implements OnInit {
  notSelected: Array<AreaDto> = [];
  selected: Array<AreaDto> = [];
  isLoadingAreas: boolean = false;

  constructor(private dataService: DataService) {}

  drop(event: CdkDragDrop<AreaDto[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    console.log(this.selected);
  }

  ngOnInit() {
    this.dataService.getCityObservable().subscribe(async () => {
      this.isLoadingAreas = true;
      this.notSelected = await this.dataService.getAreasFromCity();
      this.isLoadingAreas = false;
      this.selected = [];
    });
  }
}
