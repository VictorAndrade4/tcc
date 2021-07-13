import { Component, Input, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AreaModel, DataService } from '../data.service';
import { Observable, of } from 'rxjs';
import { MapService } from '../map/map.service';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css'],
})
export class DragAndDropComponent implements OnInit {
  selected: Array<AreaModel> = [];
  @Input() isLoadingAreas: boolean = false;

  constructor(
    private dataService: DataService,
    private mapService: MapService
  ) {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.selected, event.previousIndex, event.currentIndex);
  }

  ngOnInit() {
    this.mapService.getSelectedAreasObservable().subscribe((areas) => {
      this.selected = areas;
    });
  }
}
