export class Estudiante {
  id_estudiante: number;
  nombre: string;
  edad: number;
  genero: string;
  status: string;

  constructor(){
    this.id_estudiante = 0;
    this.nombre = "";
    this.edad = 0;
    this.genero = "";
    this.status = "";
  }
}