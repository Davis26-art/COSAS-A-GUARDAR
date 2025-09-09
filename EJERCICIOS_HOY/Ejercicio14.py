#----------------------------------------------
# EJERCICIO 14 -- Encontrar números impares entre 1 y 20
#----------------------------------------------

numero = 1  # Empezamos desde 1
limite = 20  # Hasta dónde buscar
impares_encontrados = 0  # Contador de impares

print("Buscando números impares entre 1 y", limite, ":")

while numero <= limite:
    if numero % 2 != 0:  # % es módulo, != 0 significa que es impar
        print(numero, "es impar")
        impares_encontrados += 1
    numero += 1  # Incrementamos el número

print("\nResumen:")
print("Se encontraron", impares_encontrados, "números impares")
print("El último número evaluado fue", numero - 1)
print("El límite establecido era", limite)
