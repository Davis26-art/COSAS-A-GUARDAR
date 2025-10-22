from conexion import conn

# Solicitar datos al usuario
id = input('Ingresa tu ID: ')
nombre = input('Ingresa tu nombre: ')
edad = input('Ingresa tu edad: ')
email = input('Ingresa tu email: ')

# Crear cursor (crear apuntador)
Cursor = conn.cursor()

# Ejecutar inserción con parámetros seguros
Cursor.execute(
    "INSERT INTO estudiante (id, nombre, edad, email) VALUES (%s, %s, %s, %s)",
    (id, nombre, edad, email)
)

# Guardar cambios y cerrar conexión
conn.commit()
Cursor.close()
conn.close()

print("¡Registro insertado correctamente!")