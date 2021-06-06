import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormComponent } from './form/form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StateSelectorComponent } from './state-selector/state-selector.component';
import { MatSelectModule } from '@angular/material/select';
import { MapComponent } from './map/map.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    InputComponent,
    FormComponent,
    StateSelectorComponent,
    MapComponent,
    DragAndDropComponent,
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    GoogleMapsModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    DragDropModule,
    MatProgressBarModule,
  ],
  exports: [FormComponent, MapComponent, DragAndDropComponent],
})
export class DataModule {}
