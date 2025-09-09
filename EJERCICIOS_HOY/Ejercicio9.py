#----------------------------------------------
# EJERCICIO 9 -- Juego de adivinar par o impar
#----------------------------------------------

# Juego de adivinar par o impar
numero = 8  # Número a evaluar
respuesta = "par"  # Respuesta del jugador: "par" o "impar"

print("Número a evaluar:", numero)
print("Tu respuesta es:", respuesta)

# Verificar si el número es par o impar
if numero % 2 == 0:  # El número es par
    if respuesta.lower() == "par":
        print("¡Correcto! El número es par")
    else:
        print("Incorrecto. El número es par")
else:  # El número es impar
    if respuesta.lower() == "impar":
        print("¡Correcto! El número es impar")
    else:
        print("Incorrecto. El número es impar")
print("Gracias por jugar.") 