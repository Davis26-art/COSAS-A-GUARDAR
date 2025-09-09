#----------------------------------------------
# EJERCICIO 8 -- Clasificador de velocidad
#----------------------------------------------

# Clasificador de velocidad
velocidad = 85  # Velocidad en km/h

if velocidad >= 120:
    categoria = "Muy rápido"
    mensaje = "¡Ten cuidado! Vas a alta velocidad"
elif velocidad >= 80:
    categoria = "Rápido"
    mensaje = "Conduce con precaución"
elif velocidad >= 40:
    categoria = "Moderado"
    mensaje = "Velocidad segura"
else:
    categoria = "Lento"
    mensaje = "Puedes aumentar la velocidad"

print("La velocidad es:", velocidad, "km/h")
print("Categoría:", categoria)
print("Mensaje:", mensaje)
print("Gracias por conducir con seguridad.")