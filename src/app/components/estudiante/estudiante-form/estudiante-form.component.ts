import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

//Services
import { EstudianteService } from '../../../services/estudiante.service';

//Models
import { Generos } from '../../../models/gender.model';

@Component({
  selector: 'app-estudiante-form',
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, FormsModule ],
  standalone: true,
  templateUrl: './estudiante-form.component.html',
  styleUrl: './estudiante-form.component.scss'
})

export class EstudianteFormComponent {

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

  form!: FormGroup;
  seleccionadoGenero: number;
  arrayGeneros: Array<Generos> = [];

  constructor(private fb: FormBuilder, private estudianteService: EstudianteService) {
    this.seleccionadoGenero = 0;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre_estudiante: ['', Validators.required],
      ap_paterno: ['', Validators.required],
      ap_materno: ['', Validators.required],
      edad: [0, [Validators.required, Validators.max(10)]],
      genero: [0, [Validators.required, Validators.min(1)]]
    });
    this.traerGeneros();
  }

  altaEstudiante() {
    if(this.form.value['nombre_estudiante'] == ''){
      this.Toast.fire({
        icon: 'warning',
        text: 'Agregue su(s) nombre(s) sin apellidos'
      });
    }else if(this.form.value['ap_paterno'] == ''){
      this.Toast.fire({
        icon: 'warning',
        text: 'Agregue su apellido paterno'
      });
    }else if(this.form.value['edad'] == 0){
      this.Toast.fire({
        icon: 'warning',
        text: 'Agregue su edad'
      });
    }else if(this.form.value['genero'] == 0){
      this.Toast.fire({
        icon: 'warning',
        text: 'Elija su género'
      });
    }else{
      Swal.fire({
        title: '¿Está seguro(a) de que los datos capturados son correctos?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
          let objetoEnvio = {
            "nombre_estudiante": this.form.value['nombre_estudiante'],
            "ap_paterno": this.form.value['ap_paterno'],
            "ap_materno": this.form.value['ap_materno'],
            "edad": this.form.value['edad'],
            "genero": this.form.value['genero']
          };
          /*this.estudianteService.generalPost('altaEstudiante', objetoEnvio).subscribe((result: any) => {
            if(result['code_status'] == 200){
              this.Toast.fire({
                icon: 'success',
                title: result['detalle']
              });
              this.form.reset({ nombre_estudiante: '', ap_paterno: '', ap_materno: '', edad: 0, genero: 0 });
            }else{
              this.Toast.fire({
                icon: 'error',
                title: result['detalle']
              });
            }
          });*/
        }
      })
    }
    /*const value = this.form.value;
    if (value.id) {
      //this.service.updateStudent(value);
    } else {
      //this.service.addStudent(value);
    }
    this.form.reset({ id: 0, name: '', email: '', age: 0 });*/
  }

  allowOnlyLetters(event: KeyboardEvent): void {
    const pattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/;
    const inputChar = event.key;

    if (!pattern.test(inputChar)) {
      event.preventDefault(); // Bloquea el carácter
    }
  }

  traerGeneros(){
    this.estudianteService.generalGet('getGeneros').subscribe((res: any) => {
      if(res.code_status != 200){
        this.Toast.fire({
          icon: 'error',
          title: 'Error al buscar el catálogo de géneros',
          text: 'Verifique con su Administrador'
        });
      }else{
        if(res.data.length == 0){
          this.arrayGeneros = [];
        }else{
          this.arrayGeneros = res.data;
        }
      }
    });
  }

}
