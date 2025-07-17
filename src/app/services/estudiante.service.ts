import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Estudiante } from '../models/student.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EstudianteService {

  private students: Estudiante[] = [];
  private studentsSubject = new BehaviorSubject<Estudiante[]>([]);
  private generalesUrl = `${environment.API_URL}/general/`;

  constructor( private http: HttpClient ) {}

  generalesGet(ruta: any): Observable<any> {
    return this.http.get(this.generalesUrl + ruta);
  }

  generalesPost(ruta: any, data: any): Observable<any> {
    return this.http.post(this.generalesUrl + ruta, data);
  }

  getStudents(): Observable<Estudiante[]> {
    return this.studentsSubject.asObservable();
  }

  addStudent(student: Estudiante) {
    student.id_estudiante = this.generateId();
    this.students.push(student);
    this.updateSubject();
  }

  updateStudent(updated: Estudiante) {
    const index = this.students.findIndex(s => s.id_estudiante === updated.id_estudiante);
    if (index > -1) {
      this.students[index] = updated;
      this.updateSubject();
    }
  }

  deleteStudent(id: number) {
    this.students = this.students.filter(s => s.id_estudiante !== id);
    this.updateSubject();
  }

  private updateSubject() {
    this.studentsSubject.next([...this.students]);
  }

  private generateId(): number {
    return this.students.length ? Math.max(...this.students.map(s => s.id_estudiante)) + 1 : 1;
  }

}
