#----------------------------------------------
# EJERCICIO 19
#----------------------------------------------

# Lista de libros en la estantería
libros = ["Cien años de soledad", "Don Quijote", "Hamlet", "1984", "Don Quijote", "El Principito"]

print("Estantería de libros:")
print(libros)

# Buscar si un libro específico está en la lista
libro_buscado = "Don Quijote"

if libro_buscado in libros:
    print(f"\n✅ '{libro_buscado}' está en la estantería")
    # Posición de la primera aparición
    posicion = libros.index(libro_buscado)
    print(f"Primera aparición en la posición: {posicion}")
    # Cuántas veces aparece
    cantidad = libros.count(libro_buscado)
    print(f"Aparece {cantidad} veces en total")
else:
    print(f"\n❌ '{libro_buscado}' no está en la estantería")

# Buscar múltiples libros
buscados = ["1984", "Drácula", "El Principito"]
print(f"\n🔍 Buscando libros: {buscados}")

for libro in buscados:
    if libro in libros:
        posicion = libros.index(libro)
        print(f"📗 '{libro}' encontrado en posición {posicion}")
    else:
        print(f"📕 '{libro}' no encontrado en la estantería")
print("\nGracias por usar el sistema de gestión de estantería.")