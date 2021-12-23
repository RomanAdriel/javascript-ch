let texto = prompt("Ingrese su texto: ");
let corte = "";

let contador = 1;

while (corte != "ESC"){

    alert("Esta es la repetición N°" + contador.toString() + " del texto \"" + texto + "\"");
    contador++; 
    if (contador > 9) {
        corte = "ESC";
    } else {
        corte = prompt("Ingrese ESC si desea detener la ejecución o cualquier caracter para continuar: ");
    }
}


