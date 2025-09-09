#----------------------------------------------
# EJERCICIO 20 
#----------------------------------------------

# Lista de nombres de estudiantes
estudiantes = ["Laura", "Carlos", "Ana", "Pedro", "Beatriz", "Mario", "Zoe", "Andrés", "Lucía"]

print("Lista original de estudiantes:", estudiantes)
print("Cantidad de estudiantes:", len(estudiantes))

# Crear copias para no modificar la original
ascendente = estudiantes.copy()
descendente = estudiantes.copy()

# Ordenar alfabéticamente (A-Z)
ascendente.sort()
print("\nOrden alfabético (A-Z):", ascendente)

# Ordenar alfabéticamente inverso (Z-A)
descendente.sort(reverse=True)
print("Orden alfabético inverso (Z-A):", descendente)

# Mezclar la lista aleatoriamente
import random
mezclados = estudiantes.copy()
random.shuffle(mezclados)
print("Lista mezclada aleatoriamente:", mezclados)  

# Invertir el orden actual de la lista original
invertidos = estudiantes.copy()
invertidos.reverse()
print("Lista en orden invertido:", invertidos)

# Mostrar la lista original para confirmar que no fue modificada
print("\nLista original (sin cambios):", estudiantes)
