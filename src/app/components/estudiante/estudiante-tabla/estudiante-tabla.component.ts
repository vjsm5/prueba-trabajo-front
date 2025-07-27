import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

//Models
import { Estudiante } from '../../../models/student.model';

//Services
import { EstudianteService } from '../../../services/estudiante.service';

@Component({
  selector: 'app-estudiante-tabla',
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './estudiante-tabla.component.html',
  styleUrl: './estudiante-tabla.component.scss'
})

export class EstudianteTablaComponent {

  //Swal convertido
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  columnas: any;
  selectedId: number | null = null;
  students$!: Observable<Estudiante[]>;
  estudiantes: Estudiante[] = [];
  displayedColumns: string[] = ['id_estudiante', 'nombre', 'edad', 'genero', 'status'];

  constructor(private estudianteService: EstudianteService) {}

  ngOnInit(): void {
    this.obtenerListaEstudiantes();
  }

  obtenerListaEstudiantes(){
    this.estudianteService.generalGet('getEstudiantes').subscribe((res: any) => {
      if(res.code_status != 200){
        this.Toast.fire({
          icon: 'error',
          title: 'Error al buscar la lista de estudiantes',
          text: 'Verifique con su Administrador'
        });
      }else{
        if(res.data.length == 0){
          this.estudiantes = [];
        }else{
          console.log("***");
          console.log(res.data);
          console.log("***");
          this.estudiantes = res.data;
          this.columnas = Object.keys(this.estudiantes[0]);
        }
      }
    });
  }

  seleccionar(id: number) {
    this.selectedId = id;
  }

  eliminar() {
    if (this.selectedId !== null) {
      console.log(`Eliminar estudiante con ID: ${this.selectedId}`);
      // Lógica para eliminar usando StudentService aquí
    }
  }

  /*deleteStudent(id: number) {
    this.service.deleteStudent(id);
  }*/

}
