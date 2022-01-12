function Alumno () {
    this.nombre = "";
    this.notasTP = 0;
    this.aplazosTP = 0;
    this.asistencias = 0;
    this.notaPrimerPracial = 0;
    this.notaSegundoParcial = 0;
    this.notaExamenFinal = 0;
}

function pedirNombre() {
    let nombreAlumno = prompt("Bienvenido. Ingrese el nombre del alumno: ");
    
    return nombreAlumno;
  }

function pedirAsistencias() {

    let clasesAlumno = prompt("Ingrese la cantidad de clases presenciadas por el alumno: ");

    return clasesAlumno;

}

function pedirNotasTPs(alumno) {

    let totalNotas = 0;
    let nota = 0;

    for(let i=1; i < 6; i++) {
        nota = parseFloat(prompt("Ingrese la nota del TP N°" + i + ":"));
        totalNotas = totalNotas + nota;
        if (nota <= 3) {
            alumno.aplazosTP++;
        }
    }

    return totalNotas;
        
}
  
function aprobacionAsistencias(totalClases, clasesPresente) {

    let aprobadoAsistencias = true;

    if (clasesPresente < (totalClases * 0.85)) {

        aprobadoAsistencias = false;
    }

    return aprobadoAsistencias;

    }

function promedioTPs(totalNotasTP) {

    return totalNotasTP	 / 5;
}

function calcularAprobacion(alumno, aplazosTP, promedioTP, notaPrimerPracial, notaSegundoParcial, notaExamenFinal, porcentajeAsistencias) {

    if ((aplazosTP > 1) || (!porcentajeAsistencias) || (notaPrimerPracial < 4) || (notaSegundoParcial < 4) || (notaExamenFinal < 4)) {
        alert('El alumno ' + alumno + ' ha desaprobado la cursada.');
    } else {

        let notaFinal = (promedioTP + notaPrimerPracial + notaSegundoParcial + notaExamenFinal) / 4;

        alert('El alumno ' + alumno + ' ha aprobado la cursada con un promedio de ' + notaFinal);
    }
}

// main
let cantClases = 25;
let cantTPs = 5;
let continuar = "s";

while (continuar == "s") {

    let alumno = new Alumno();

    alumno.nombre = pedirNombre();
    alumno.notasTP = pedirNotasTPs(alumno);
    alumno.asistencias = pedirAsistencias();
    let promedioTP = promedioTPs(alumno.notasTP);

    alumno.notaPrimerPracial = parseFloat(prompt("Ingrese la nota del primer parcial: "));
    alumno.notaSegundoParcial = parseFloat(prompt("Ingrese nota del segundo parcial: "));
    alumno.notaExamenFinal = parseFloat(prompt("Ingrese nota del examen final: "));

    let porcentajeAsistencias = aprobacionAsistencias(cantClases, alumno.asistencias);

    calcularAprobacion(alumno.nombre, alumno.aplazosTP, promedioTP, alumno.notaPrimerPracial, alumno.notaSegundoParcial, alumno.notaExamenFinal, porcentajeAsistencias);

    continuar = prompt("Desea calcular los datos de otro alumno? (S/N): ").toLowerCase;

}