let estadoCivil = prompt("Ingrese su estado civil (Soltero/Casado): ");
let sueldo = parseInt(prompt("Ingrese su sueldo: "));

if (((estadoCivil == "Casado") && (sueldo > 200000)) || ((estadoCivil == "Soltero") && (sueldo > 150000)))  {
    alert("Usted paga Impuesto a las Ganancias");
    
} else {
    alert("Usted NO paga Impuesto a las Ganancias");
    
}
