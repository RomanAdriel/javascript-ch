let nombre = prompt("Ingrese su nombre: ");
let apellido = prompt("Ingrese su apellido: ")
let sueldo = parseInt(prompt("Ingrese su sueldo: "))

let descuentos = sueldo * 0.17

alert("Hola " + nombre + " " + apellido);
alert("El Estado le quitará de su sueldo la siguiente cantidad: $" + descuentos)
