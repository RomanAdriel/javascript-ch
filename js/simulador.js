function Alumno () {
    this.nombre = "";
    this.apellido = "";
    this.notasTP = 0;
    this.aplazosTP = 0;
    this.asistencias = 0;
    this.notaPrimerParcial = 0;
    this.notaSegundoParcial = 0;
    this.notaExamenFinal = 0;
    this.notaFinal = 0;
    this.promedioTP = 0;
    this.presentismo = false;
}

function pedirNombre() {
    let nombreAlumno = prompt("Bienvenido. Ingrese el nombre del alumno: ");
    let apellidoAlumno = prompt("Ingrese el apellido del alumno: ");
    
    return [nombreAlumno, apellidoAlumno];
  }

function pedirAsistencias() {

    let clasesAlumno = parseInt(prompt("Ingrese la cantidad de clases presenciadas por el alumno: "));

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
  
function aprobacionAsistencias(totalClases, alumno) {

    let aprobadoAsistencias = true;

    if (alumno.asistencias < (totalClases * 0.85)) {

        aprobadoAsistencias = false;
    }

    return aprobadoAsistencias;

    }

function promedioTPs(totalNotasTP) {

    return totalNotasTP	 / 5;
}

function calcularAprobacion(alumno) {

    alumno.notaFinal = (alumno.promedioTP + alumno.notaPrimerParcial + alumno.notaSegundoParcial + alumno.notaExamenFinal) / 4;

    if ((alumno.aplazosTP > 1) || (!alumno.presentismo) || (alumno.notaPrimerParcial < 4) || (alumno.notaSegundoParcial < 4) || (alumno.notaExamenFinal < 4)) {
        alert('El alumno ' + alumno.nombre + " " + alumno.apellido + ' ha desaprobado la cursada.');
    } else {

        alert('El alumno ' + alumno.nombre + " " + alumno.apellido + ' ha aprobado la cursada con un promedio de ' + alumno.notaFinal);
    }
}

// Funciones de comparación para ordenamiento

function compararNombreAsc(a, b) {
    if (a.nombre < b.nombre ){
      return -1;
    }
    if (a.nombre > b.nombre){
      return 1;
    }
    return 0;
  }

  function compararNombreDesc(a, b) {
    if (a.nombre < b.nombre){
      return 1;
    }
    if (a.nombre > b.nombre){
      return -1;
    }
    return 0;
  }

  function compararApellidoAsc(a, b) {
    if (a.apellido < b.apellido ){
      return -1;
    }
    if (a.apellido > b.apellido){
      return 1;
    }
    return 0;
  }

  function compararApellidoDesc(a, b) {
    if (a.apellido < b.apellido){
      return 1;
    }
    if (a.apellido > b.apellido){
      return -1;
    }
    return 0;
  }

  function compararNotaAsc(a, b) {
    return a.notaFinal - b.notaFinal;
  }

  function compararNotaDesc(a, b) {
    return b.notaFinal - a.notaFinal;
  }


function ordenarAlumnos(alumnos, criterio, ord) {

    if (criterio == 1) {
        if (ord == 1) {
            alumnos.sort(compararNombreAsc);

        } else {
            alumnos.sort(compararNombreDesc);

        }
    } else if (criterio == 2) {
        if (ord == 1) {
            alumnos.sort(compararApellidoAsc);

        } else {
            alumnos.sort(compararApellidoDesc);

        }
     } else {
        if (ord == 1) {
            alumnos.sort(compararNotaAsc);

        } else {
            alumnos.sort(compararNotaDesc);

        }

    }
}

function mostrarAlumnosOrdenados(alumnos) {

    console.log(Object.keys(alumnos[0]).join(" | "));

    for (const alumno of alumnos) {

        console.log(Object.values(alumno).join(" | "));

        }
}

// main
let cantClases = 25;
let cantTPs = 5;
let continuar = "s";
let listaAlumnos = [];
let criterioOrd = 0;
let orden = 0;

while (continuar == "s") {

    let alumno = new Alumno();

    console.log(alumno);

    [alumno.nombre, alumno.apellido] = pedirNombre();
    console.log(alumno);
    alumno.notasTP = pedirNotasTPs(alumno);
    console.log(alumno);
    alumno.asistencias = pedirAsistencias();
    console.log(alumno);
    alumno.promedioTP = promedioTPs(alumno.notasTP);
    console.log(alumno);

    alumno.notaPrimerParcial = parseFloat(prompt("Ingrese la nota del primer parcial: "));
    console.log(alumno);
    alumno.notaSegundoParcial = parseFloat(prompt("Ingrese nota del segundo parcial: "));
    console.log(alumno);
    alumno.notaExamenFinal = parseFloat(prompt("Ingrese nota del examen final: "));
    console.log(alumno);

    alumno.presentismo = aprobacionAsistencias(cantClases, alumno);
    console.log(alumno);

    calcularAprobacion(alumno);
    console.log(alumno);
    listaAlumnos.push(alumno);

    continuar = prompt("Desea calcular los datos de otro alumno? (S/N): ").toLowerCase();

}


let mostrarListado = prompt("Desea visualizar el listado final de alumnos? (S/N): ").toLowerCase();
let alumnosOrdenados = [];

while (mostrarListado == "s") {

    criterioOrd = parseInt(prompt("Ingrese el criterio de ordenamiento:\n1 - Nombre\n2 - Apellido\n3 - Nota Final"));
    orden = parseInt(prompt("Ingrese el tipo de ordenamiento:\n1 - Ascendente\n2 - Descendente"));

    alumnosOrdenados = listaAlumnos.map(elemento => elemento);
    
    ordenarAlumnos(alumnosOrdenados, criterioOrd, orden);

    mostrarAlumnosOrdenados(alumnosOrdenados);

    mostrarListado = prompt("Desea reordenar el listado final de alumnos? (S/N): ").toLowerCase();

}