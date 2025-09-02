print('Bienvenido a i supermercado El Buen Precio')
print('Estos son nuestros productos:')
print('------------------------------')
print('Aquí está su factura:\n')
cliente = input('Ingrese su nombre: ')
producto = input('Ingrese el nombre del producto: ')
cantidad = int(input('Ingrese la cantidad del producto: '))
precio_unitario = float(input('Ingrese el precio unitario del producto: '))
subtotal = cantidad * precio_unitario
iva = subtotal * 0.19
total = subtotal + iva  
print('\n----- Factura -----')
print(f'Cliente: {cliente}')
print(f'Producto: {producto}')
print(f'Cantidad: {cantidad}')
print(f'Precio unitario: ${precio_unitario:.2f}')
print(f'Subtotal: ${subtotal:.2f}')
print(f'IVA (19%): ${iva:.2f}')
print(f'Total a pagar: ${total:.2f}')
print('-------------------')
print('Gracias por su compra. ¡Vuelva pronto!')

