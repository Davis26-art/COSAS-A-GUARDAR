#----------------------------------------------
# EJERCICIO 13 -- Multiplicador acumulativo del 1 al 10
#----------------------------------------------

producto_total = 1  # Inicializamos el producto (no 0 porque multiplicar por 0 da 0)
numero_actual = 1  # Empezamos desde 1
limite = 10  # Hasta qué número multiplicar

print("Multiplicando números del 1 al", limite, "...")

while numero_actual <= limite:
    producto_total = producto_total * numero_actual  # Acumulamos la multiplicación
    print("Multiplicando", numero_actual, "- Producto hasta ahora:", producto_total)
    numero_actual = numero_actual + 1

print("\nResultado final:")
print("El producto de todos los números del 1 al", limite, "es:", producto_total)
