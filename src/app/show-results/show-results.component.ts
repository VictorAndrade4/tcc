import { Component, Input, OnInit } from '@angular/core';
import { MobileOperatorResult } from '../utils/models';

@Component({
  selector: 'app-show-results',
  templateUrl: './show-results.component.html',
  styleUrls: ['./show-results.component.css'],
})
export class ShowResultsComponent implements OnInit {
  @Input() results: MobileOperatorResult[] = [
    { name: 'OI', rating: 0, position: 0 },
    { name: 'TIM', rating: 0, position: 0 },
    { name: 'VIVO', rating: 0, position: 0 },
  ];

  displayedColumns: string[] = ['position', 'name', 'rating'];

  get dataSource() {
    return this.results
      .sort((a, b) => {
        return b.rating - a.rating;
      })
      .map((mobileOperator, i) => {
        mobileOperator.position = i + 1;
        return mobileOperator;
      });
  }

  constructor() {}

  ngOnInit(): void {}
}
