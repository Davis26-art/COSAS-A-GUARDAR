#----------------------------------------------
# EJERCICIO 7 -- Calculadora de envío
#----------------------------------------------

# Calculadora de envío
precio_total = 85  # Total de la compra
costo_envio = 0  # Inicializamos el costo de envío

if precio_total >= 100:  # Si gasta $100 o más
    costo_envio = 0  # Envío gratis
    print("¡Envío gratis aplicado!")
else:
    costo_envio = 10  # Tarifa fija de envío
    print("Costo de envío: $", costo_envio)

# Precio final incluye el envío (si aplica)
precio_final = precio_total + costo_envio

# Mostrar resultado final
print("Precio total de la compra: $", precio_total)
print("Precio final con envío: $", precio_final)
print("Gracias por su compra.")