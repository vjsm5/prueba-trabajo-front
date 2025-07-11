import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { EstudianteService } from '../../../services/estudiante.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estudiante-form',
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './estudiante-form.component.html',
  styleUrl: './estudiante-form.component.scss'
})

export class EstudianteFormComponent {

  form!: FormGroup;

  constructor(private fb: FormBuilder, private service: EstudianteService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [0, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    const value = this.form.value;
    if (value.id) {
      this.service.updateStudent(value);
    } else {
      this.service.addStudent(value);
    }
    this.form.reset({ id: 0, name: '', email: '', age: 0 });
  }

}
