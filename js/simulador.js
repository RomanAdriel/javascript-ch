function pedirNombre() {
    let nombreAlumno = prompt("Bienvenido. Ingrese el nombre del alumno: ");
    
    return nombreAlumno;
  }

function pedirAsistencias() {

    let clasesAlumno = prompt("Ingrese la cantidad de clases presenciadas por el alumno: ");

    return clasesAlumno;

}

function pedirNotasTPs() {

    let aplazos = 0;
    let totalNotas = 0;
    let nota = 0;

    for(let i=1; i < 6; i++) {
        nota = parseFloat(prompt("Ingrese la nota del TP N°" + i + ":"));
        totalNotas = totalNotas + nota;
        if (nota <= 3) {
            aplazos++;
        }
    }

    return [totalNotas, aplazos];
        
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
let alumno = pedirNombre();
let [totalNotasTP, aplazosTP] = pedirNotasTPs();
let clasesPresente = pedirAsistencias();
let promedioTP = promedioTPs(totalNotasTP);

let notaPrimerPracial = parseFloat(prompt("Ingrese la nota del primer parcial: "));
let notaSegundoParcial = parseFloat(prompt("Ingrese nota del segundo parcial: "));
let notaExamenFinal = parseFloat(prompt("Ingrese nota del examen final: "));

let porcentajeAsistencias = aprobacionAsistencias(cantClases, clasesPresente);

calcularAprobacion(alumno, aplazosTP, promedioTP, notaPrimerPracial, notaSegundoParcial, notaExamenFinal, porcentajeAsistencias);

  