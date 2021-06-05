import { Component, Input, OnInit } from '@angular/core';
import { State } from 'src/app/utils/models';
import { DataService } from '../data.service';

@Component({
  selector: 'app-state-selector',
  templateUrl: './state-selector.component.html',
  styleUrls: ['./state-selector.component.css'],
})
export class StateSelectorComponent implements OnInit {
  @Input() states: State[] = [];

  constructor(private dataService: DataService) {}

  set stateSelected(value: string) {
    this.dataService.state = value;
  }

  ngOnInit(): void {}
}
