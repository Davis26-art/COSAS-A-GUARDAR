#----------------------------------------------
# EJERCICIO 17 -- Gestión de una lista de tareas
#----------------------------------------------

tareas = ["desayunar", "leer correos", "hacer ejercicio"]
print("Lista inicial de tareas:")
print(tareas)

# Agregar tareas al final
tareas.append("trabajar en el proyecto")
tareas.append("almorzar")
print("\nDespués de agregar dos tareas:")
print(tareas)

# Insertar una tarea en una posición específica
tareas.insert(2, "reunión con el equipo")
print("\nDespués de insertar una reunión en la posición 2:")
print(tareas)

# Eliminar una tarea específica
tareas.remove("leer correos")
print("\nDespués de eliminar 'leer correos':")
print(tareas)

# Eliminar la última tarea usando pop()
tarea_eliminada = tareas.pop()  # Sin índice, elimina el último
print("\nEliminamos la última tarea:", tarea_eliminada)
print("Lista final de tareas:", tareas)

# Contar cuántas tareas hay
print("Número total de tareas restantes:", len(tareas))