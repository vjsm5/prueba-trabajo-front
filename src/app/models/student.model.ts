export class Estudiante {
  id_estudiante: number;
  nombre_estudiante: string;
  ap_paterno: string;
  ap_materno: string;
  edad: number;
  genero: number;

  constructor(){
    this.id_estudiante = 0;
    this.nombre_estudiante = "";
    this.ap_paterno = "";
    this.ap_materno = "";
    this.edad = 0;
    this.genero = 0;
  }
}