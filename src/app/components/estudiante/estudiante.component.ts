import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EstudianteFormComponent } from './estudiante-form/estudiante-form.component';
import { EstudianteTablaComponent } from './estudiante-tabla/estudiante-tabla.component';
import { CommonModule } from '@angular/common';

//Servicios
import { EstudianteService } from '../../services/estudiante.service';

@Component({
  selector: 'app-estudiante',
  imports: [ CommonModule, EstudianteFormComponent, EstudianteTablaComponent ],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.scss'
})

export class EstudianteComponent {

  constructor( public dialog: MatDialog, private estudianteService: EstudianteService ) { }

  ngOnInit(): void {
    this.traerEstudiantes();
  }

  traerEstudiantes(){
    this.estudianteService.generalGet('getEstudiantes').subscribe((res: any) => {
      console.log(JSON.stringify(res));
    });
  }

}
