import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudianteService } from '../../../services/estudiante.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { Estudiante } from '../../../models/student.model';

@Component({
  selector: 'app-estudiante-tabla',
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './estudiante-tabla.component.html',
  styleUrl: './estudiante-tabla.component.scss'
})

export class EstudianteTablaComponent {

  students$!: Observable<Estudiante[]>;
  displayedColumns: string[] = ['id_estudiante', 'nombre', 'edad', 'genero', 'status'];

  constructor(private service: EstudianteService) {}

  ngOnInit(): void {
    this.students$ = this.service.getStudents();
  }

  deleteStudent(id: number) {
    this.service.deleteStudent(id);
  }

}
