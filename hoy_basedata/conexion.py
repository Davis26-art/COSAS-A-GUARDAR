import psycopg2

# Establecer conexión
conn = psycopg2.connect(
    host='localhost', 
    user='postgres',
    password='1234',
    database='escuela64',
    port='5432'
)

print('¡Conexión exitosa!')

