import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit, OnChanges {
  control = new FormControl();
  filteredOptions!: Observable<string[]>;

  @Input() options: string[] = [];
  @Input() name = '';
  @Input() placeholder = '';
  @Input() disabled = false;

  constructor() {}

  ngOnInit() {
    this.updateOptions();
  }

  ngOnChanges(): void {
    this.updateOptions();
  }

  private updateOptions() {
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
