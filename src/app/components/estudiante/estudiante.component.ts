import { Component } from '@angular/core';
import { EstudianteFormComponent } from './estudiante-form/estudiante-form.component';
import { EstudianteTablaComponent } from './estudiante-tabla/estudiante-tabla.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estudiante',
  imports: [ CommonModule, EstudianteFormComponent, EstudianteTablaComponent ],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.scss'
})

export class EstudianteComponent {

}
