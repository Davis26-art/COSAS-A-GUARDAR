#----------------------------------------------
# EJERCICIO 12 -- Tabla de suma del 1 al 10
#----------------------------------------------

numero = 7  # Número para la tabla de suma
contador = 1  # Empezamos sumando 1

print("Tabla de suma del", numero, ":")
print("=" * 25)  # Línea decorativa

while contador <= 10:
    resultado = numero + contador
    print(numero, "+", contador, "=", resultado)
    contador = contador + 1

print("=" * 25)
print("¡Tabla de suma completa!")
print("Gracias por usar el generador de tablas de suma.")