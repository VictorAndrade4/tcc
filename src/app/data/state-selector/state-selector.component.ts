import { Component, Input, OnInit } from '@angular/core';
import { State } from 'src/app/utils/models';
import { DataService } from '../data.service';

@Component({
  selector: 'app-state-selector',
  templateUrl: './state-selector.component.html',
  styleUrls: ['./state-selector.component.css'],
})
export class StateSelectorComponent implements OnInit {
  private state = '';

  constructor(private dataService: DataService) {}

  get stateSelected() {
    return this.state;
  }

  set stateSelected(value: string) {
    this.state = value;
    this.dataService.state = value;
  }

  @Input() states: State[] = [];

  ngOnInit(): void {}
}
