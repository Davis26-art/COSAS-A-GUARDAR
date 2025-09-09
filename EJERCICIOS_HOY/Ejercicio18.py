#----------------------------------------------
# EJERCICIO 18 -- Estadísticas de tiempos de carrera
#----------------------------------------------

# Tiempos de carrera del atleta (en minutos)
tiempos = [12.5, 11.8, 13.2, 12.0, 11.5, 12.7, 13.0, 11.9]

print("Tiempos registrados en cada carrera (en minutos):")
print(tiempos)

# Estadísticas básicas
total_carreras = len(tiempos)
tiempo_total = sum(tiempos)
promedio_tiempo = tiempo_total / total_carreras
tiempo_mas_rapido = min(tiempos)  # menor tiempo = más rápido
tiempo_mas_lento = max(tiempos)  # mayor tiempo = más lento

print(f"\n--- ESTADÍSTICAS ---")
print(f"Total de carreras: {total_carreras}")
print(f"Tiempo total: {tiempo_total} minutos")
print(f"Promedio por carrera: {promedio_tiempo:.2f} minutos")
print(f"Tiempo más rápido: {tiempo_mas_rapido} minutos")
print(f"Tiempo más lento: {tiempo_mas_lento} minutos")

# Contar carreras con tiempo menor a 12.0 (buen desempeño)
buen_desempeño = 0
for tiempo in tiempos:
    if tiempo < 12.0:
        buen_desempeño += 1

print(f"Carreras con buen desempeño (< 12.0 min): {buen_desempeño} de {total_carreras}")
print("Gracias por usar el sistema de estadísticas de carreras.")