#----------------------------------------------
# EJERCICIO 6 -- Verificador de acceso a película
#----------------------------------------------

# Verificador de acceso a película para mayores de 13
edad = 12  # Edad de la persona

if edad >= 13:  # Si la edad es mayor o igual a 13
    print("Puedes ver la película")
    print("Clasificación: Apta para mayores de 13")
else:  # Si no cumple la condición anterior
    print("No puedes ver esta película")
    print("Clasificación: Restringida para menores de 13")

print("Tu edad es:", edad, "años")
