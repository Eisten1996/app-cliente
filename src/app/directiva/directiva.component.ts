import {Component} from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {
  listaCurso: string[] = ['TypeScrip', 'JavaScript', 'Java SE', 'C#', 'PHP'];

  constructor() {
  }
}
