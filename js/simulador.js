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
  $("#alumnosLista").empty();

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

  let divAlumno = $("#resultado-alumno");
  divAlumno.empty();

  alumno.notaFinal = (alumno.promedioTP + alumno.notaPrimerParcial + alumno.notaSegundoParcial + alumno.notaExamenFinal) / 4;

  if ((alumno.aplazosTP > 1) || (!alumno.presentismo) || (alumno.notaPrimerParcial < 4) || (alumno.notaSegundoParcial < 4) || (alumno.notaExamenFinal < 4)) {
    divAlumno.append("El alumno " + alumno.nombre + " " + alumno.apellido + " ha desaprobado la cursada");
  } else {

    divAlumno.append("El alumno " + alumno.nombre + " " + alumno.apellido + " ha aprobado la cursada con un promedio de " + alumno.notaFinal);
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

  let lista = $("#alumnosLista").empty();

  for (const alumno of alumnos) {
    lista.append("<li>" + Object.values(alumno)[0] + " " + Object.values(alumno)[1] + " (" + Object.values(alumno)[8] + ")" +"</li>")
  }
}

// main
let cantClases = 25;
let cantTPs = 5;
let continuar = true;
let listaAlumnos = [];
let criterioOrd = 0;
let orden = 0;

$(document).ready().on('keyup', function (event) {
  if (event.keyCode === 13) {
    $('#enviar-alumno').click();
  }
})

// Carga de alumnos mediante lectura de formulario

$("#form-alumno").on("submit", function (event) {
      event.preventDefault();

      let alumno = new Alumno();
  
      alumno.nombre = $("#nombre-alumno").val();
      alumno.apellido = $("#apellido-alumno").val();
      alumno.notasTP = parseFloat($("#nota-tp1").val()) + parseFloat($("#nota-tp2").val()) + parseFloat($("#nota-tp3").val()) + parseFloat($("#nota-tp4").val()) + parseFloat($("#nota-tp5").val());
      alumno.aplazosTP = parseInt($("#aplazos-alumno").val());
      alumno.notaPrimerParcial = parseFloat($("#nota-primer-parcial-alumno").val());
      alumno.notaSegundoParcial = parseFloat($("#nota-segundo-parcial-alumno").val());
      alumno.notaExamenFinal = parseFloat($("#nota-examen-final-alumno").val());
      alumno.asistencias = parseInt($("#asistencias-alumno").val());

      alumno.promedioTP = promedioTPs(alumno.notasTP);

      alumno.presentismo = aprobacionAsistencias(cantClases, alumno);

      calcularAprobacion(alumno);
      listaAlumnos.push(alumno);
      localStorage.setItem("listaDeAlumnos", JSON.stringify(listaAlumnos));
    });


    // Listado de Alumnos

    $("#nombre-asc").on("click", function() {ordenarAlumnos(listaAlumnos, 1, 1);});
    $("#nombre-desc").on("click", function() {ordenarAlumnos(listaAlumnos, 1, 2);});
    $("#apellido-asc").on("click", function() {ordenarAlumnos(listaAlumnos, 2, 1);});
    $("#apellido-desc").on("click", function() {ordenarAlumnos(listaAlumnos, 2, 2);});
    $("#nota-asc").on("click", function() {ordenarAlumnos(listaAlumnos, 3, 1);});
    $("#nota-desc").on("click", function() {ordenarAlumnos(listaAlumnos, 3, 2);});

    // Borrar Listado
    $("#borrar-lista").click(borrarListaAlumnos);