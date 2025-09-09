#----------------------------------------------
# EJERCICIO 15 -- Adivina si un número es múltiplo de 3
#----------------------------------------------

numero_secreto = 9  # Número para adivinar si es múltiplo de 3
intentos_maximos = 4
intento_actual = 1

print("¡Bienvenido al juego de múltiplos de 3!")
print("Tienes", intentos_maximos, "intentos para adivinar si el número es múltiplo de 3")

while intento_actual <= intentos_maximos:
    print("\n--- Intento", intento_actual, "de", intentos_maximos, "---")
    
    # Simulamos que el jugador da una respuesta (sí o no)
    if intento_actual == 1:
        respuesta = "no"
    elif intento_actual == 2:
        respuesta = "sí"
    elif intento_actual == 3:
        respuesta = "no"
    else:
        respuesta = "sí"
    
    print("Tu respuesta:", respuesta)
    
    # Verificamos si el número es múltiplo de 3
    es_multiplo = (numero_secreto % 3 == 0)
    
    if (respuesta.lower() == "sí" and es_multiplo) or (respuesta.lower() == "no" and not es_multiplo):
        print("¡Correcto! El número", numero_secreto, "es", "múltiplo de 3" if es_multiplo else "no es múltiplo de 3")
        break  # Salimos del bucle si la respuesta es correcta
    else:
        print("Incorrecto, intenta de nuevo.")
        intento_actual += 1

if intento_actual > intentos_maximos:
    print("\n¡Se acabaron los intentos! El número era", numero_secreto)
print("Gracias por jugar.")
