import { Component, OnInit } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { STATES_LIST } from 'src/app/utils/const';
import { DataService } from '../data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  cityOptions: Observable<string[]> = of([]);

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getStateObservable().subscribe((state) => {
      this.cityOptions = this.dataService.getCityOptions(state);
    });
  }

  get states() {
    return STATES_LIST;
  }
}
