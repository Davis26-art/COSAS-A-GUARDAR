console.log('Esta es una calculadora: ')
var operador = prompt('Digita el calculo que vas a hacer (+, -, *, /): ');

var numero1 = Number(prompt('Digita tu el primer número: '));
var numero2 = Number(prompt('Digita tu el segundo número: '));


if (operador == '+') {
    var calculo_sum = numero1 + numero2
    console.log(calculo_sum);

} else if (operador == '-') {
    var calculo_res = numero1 - numero2;
    console.log(calculo_res);

} else if (operador == '*') {
    var calculo_mult = numero1 * numero2;
    console.log(calculo_mult);

} else if (operador == '/') {
    if (numero2 == 0) {
        console.log('No es posible dividir por 0.');
    } else { 
        var calculo_div = numero1 / numero2;
    console.log(calculo_div);
    }
    

} else { console.log('Operación Invalida.');

}
