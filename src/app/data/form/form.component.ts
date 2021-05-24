import { Component, OnInit } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { first } from 'rxjs/operators';
import { State } from 'src/app/utils/models';
import { DataService } from '../data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  states: State[] = [
    { initials: 'AC', fullname: 'Acre' },
    { initials: 'AL', fullname: 'Alagoas' },
    { initials: 'AP', fullname: 'Amapá' },
    { initials: 'AM', fullname: 'Amazonas' },
    { initials: 'BA', fullname: 'Bahia' },
    { initials: 'CE', fullname: 'Ceará' },
    { initials: 'DF', fullname: 'Distrito Federal' },
    { initials: 'ES', fullname: 'Espírito Santo' },
    { initials: 'GO', fullname: 'Goías' },
    { initials: 'MA', fullname: 'Maranhão' },
    { initials: 'MT', fullname: 'Mato Grosso' },
    { initials: 'MS', fullname: 'Mato Grosso do Sul' },
    { initials: 'MG', fullname: 'Minas Gerais' },
    { initials: 'PA', fullname: 'Pará' },
    { initials: 'PB', fullname: 'Paraíba' },
    { initials: 'PR', fullname: 'Paraná' },
    { initials: 'PE', fullname: 'Pernambuco' },
    { initials: 'PI', fullname: 'Piauí' },
    { initials: 'RJ', fullname: 'Rio de Janeiro' },
    { initials: 'RN', fullname: 'Rio Grande do Norte' },
    { initials: 'RS', fullname: 'Rio Grande do Sul' },
    { initials: 'RO', fullname: 'Rondônia' },
    { initials: 'RR', fullname: 'Roraíma' },
    { initials: 'SC', fullname: 'Santa Catarina' },
    { initials: 'SP', fullname: 'São Paulo' },
    { initials: 'SE', fullname: 'Sergipe' },
    { initials: 'TO', fullname: 'Tocantins' },
  ];

  cityOptions: Observable<string[]> = of([]);

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getStateObservable().subscribe((state) => {
      console.log(state);
      this.cityOptions = this.dataService.getCityOptions();
    });
  }
}
