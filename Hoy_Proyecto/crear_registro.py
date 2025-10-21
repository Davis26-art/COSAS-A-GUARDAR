import psycopg2

# Solicitar datos al usuario
id = input('Ingresa tu ID: ')
nombre = input('Ingresa tu nombre: ')
edad = input('Ingresa tu edad: ')
email = input('Ingresa tu email: ')

# Establecer conexión
conn = psycopg2.connect(
    host='localhost',
    user='postgres',
    password='1234',
    database='escuela64',
    port='5432'
)

print('¡Conexión exitosa!')

# Crear cursor
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
