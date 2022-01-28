function Alumno() {
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

// Eventos

function borrarListaAlumnos() {
  let lista = document.getElementById("alumnosLista");
  lista.innerHTML = "";

}

// Funciones principales de carga de datos

function aprobacionAsistencias(totalClases, alumno) {

  let aprobadoAsistencias = true;

  if (alumno.asistencias < (totalClases * 0.85)) {

    aprobadoAsistencias = false;
  }

  return aprobadoAsistencias;

}

function promedioTPs(totalNotasTP) {

  return totalNotasTP / 5;
}

function calcularAprobacion(alumno) {

  let divAlumno = document.getElementById("resultado-alumno");

  alumno.notaFinal = (alumno.promedioTP + alumno.notaPrimerParcial + alumno.notaSegundoParcial + alumno.notaExamenFinal) / 4;

  if ((alumno.aplazosTP > 1) || (!alumno.presentismo) || (alumno.notaPrimerParcial < 4) || (alumno.notaSegundoParcial < 4) || (alumno.notaExamenFinal < 4)) {
    divAlumno.innerHTML = "El alumno " + alumno.nombre + " " + alumno.apellido + " ha desaprobado la cursada";
  } else {

    divAlumno.innerHTML = "El alumno " + alumno.nombre + " " + alumno.apellido + " ha aprobado la cursada con un promedio de " + alumno.notaFinal;
  }
}

// Funciones de comparación para ordenamiento

function compararNombreAsc(a, b) {
  if (a.nombre < b.nombre) {
    return -1;
  }
  if (a.nombre > b.nombre) {
    return 1;
  }
  return 0;
}

function compararNombreDesc(a, b) {
  if (a.nombre < b.nombre) {
    return 1;
  }
  if (a.nombre > b.nombre) {
    return -1;
  }
  return 0;
}

function compararApellidoAsc(a, b) {
  if (a.apellido < b.apellido) {
    return -1;
  }
  if (a.apellido > b.apellido) {
    return 1;
  }
  return 0;
}

function compararApellidoDesc(a, b) {
  if (a.apellido < b.apellido) {
    return 1;
  }
  if (a.apellido > b.apellido) {
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

  let alumnosOrdenados = [];
  alumnosOrdenados = alumnos.map(elemento => elemento);

  if (criterio == 1) {
    if (ord == 1) {
      alumnosOrdenados.sort(compararNombreAsc);
      mostrarAlumnosOrdenados(alumnosOrdenados)

    } else {
      alumnosOrdenados.sort(compararNombreDesc);
      mostrarAlumnosOrdenados(alumnosOrdenados)

    }
  } else if (criterio == 2) {
    if (ord == 1) {
      alumnosOrdenados.sort(compararApellidoAsc);
      mostrarAlumnosOrdenados(alumnosOrdenados)

    } else {
      alumnosOrdenados.sort(compararApellidoDesc);
      mostrarAlumnosOrdenados(alumnosOrdenados)

    }
  } else {
    if (ord == 1) {
      alumnosOrdenados.sort(compararNotaAsc);
      mostrarAlumnosOrdenados(alumnosOrdenados)

    } else {
      alumnosOrdenados.sort(compararNotaDesc);
      mostrarAlumnosOrdenados(alumnosOrdenados)

    }

  }
}

// Ordenar Alumnos

function mostrarAlumnosOrdenados(alumnos) {

  let lista = document.getElementById("alumnosLista");
  lista.innerHTML = "";

  for (const alumno of alumnos) {
    let li = document.createElement("li");
    li.innerHTML = Object.values(alumno)[0] + " " + Object.values(alumno)[1] + " (" + Object.values(alumno)[8] + ")";
    lista.appendChild(li);

  }
}

// main
let cantClases = 25;
let cantTPs = 5;
let continuar = true;
let listaAlumnos = [];
let criterioOrd = 0;
let orden = 0;
document.body.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    document.getElementById("borrar-lista").click();
  }
})

// Carga de alumnos mediante lectura de formulario

const formularioAlumno = document.getElementById("form-alumno");
formularioAlumno.addEventListener("submit", function (event) {
      event.preventDefault();

      let alumno = new Alumno();
  
      alumno.nombre = document.getElementById("nombre-alumno").value;
      alumno.apellido = document.getElementById("apellido-alumno").value;
      alumno.notasTP = parseFloat(document.getElementById("nota-tp1").value) + parseFloat(document.getElementById("nota-tp2").value) + parseFloat(document.getElementById("nota-tp3").value) + parseFloat(document.getElementById("nota-tp4").value) + parseFloat(document.getElementById("nota-tp5").value);
      alumno.aplazosTP = parseInt(document.getElementById("aplazos-alumno").value);
      alumno.notaPrimerParcial = parseFloat(document.getElementById("nota-primer-parcial-alumno").value);
      alumno.notaSegundoParcial = parseFloat(document.getElementById("nota-segundo-parcial-alumno").value);
      alumno.notaExamenFinal = parseFloat(document.getElementById("nota-examen-final-alumno").value);
      alumno.asistencias = parseInt(document.getElementById("asistencias-alumno").value);

      alumno.promedioTP = promedioTPs(alumno.notasTP);

      alumno.presentismo = aprobacionAsistencias(cantClases, alumno);

      calcularAprobacion(alumno);
      listaAlumnos.push(alumno);
      localStorage.setItem("listaDeAlumnos", JSON.stringify(listaAlumnos));
    });


    // Listado de Alumnos

    botonNombreAsc = document.getElementById("nombre-asc");
    botonNombreAsc.addEventListener("click", function() {ordenarAlumnos(listaAlumnos, 1, 1);});
    botonNombreDesc = document.getElementById("nombre-desc");
    botonNombreDesc.addEventListener("click", function() {ordenarAlumnos(listaAlumnos, 1, 2);});
    botonApellidoAsc = document.getElementById("apellido-asc");
    botonApellidoAsc.addEventListener("click", function() {ordenarAlumnos(listaAlumnos, 2, 1);});
    botonApellidoDesc = document.getElementById("apellido-desc");
    botonApellidoDesc.addEventListener("click", function() {ordenarAlumnos(listaAlumnos, 2, 2);});
    botonNotaAsc = document.getElementById("nota-asc");
    botonNotaAsc.addEventListener("click", function() {ordenarAlumnos(listaAlumnos, 3, 1);});
    botonNotaDesc = document.getElementById("nota-desc");
    botonNotaDesc.addEventListener("click", function() {ordenarAlumnos(listaAlumnos, 3, 2);});