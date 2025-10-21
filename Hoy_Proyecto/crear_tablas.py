import psycopg2

def crear_tablas(cursor):
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS estudiante (
        id VARCHAR(50) PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        edad INTEGER,
        email VARCHAR(100)
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS curso (
        id_curso SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        descripcion TEXT
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS inscripcion (
        id_insc SERIAL PRIMARY KEY,
        id_estudiante VARCHAR(50) REFERENCES estudiante(id),
        id_curso INTEGER REFERENCES curso(id_curso),
        fecha_inscripcion DATE DEFAULT CURRENT_DATE
    );
    """)

def main():
    id = input('Ingresa tu ID: ')
    nombre = input('Ingresa tu nombre: ')
    edad = input('Ingresa tu edad: ')
    email = input('Ingresa tu email: ')

    nombre_curso = input('Nombre del curso: ')
    descripcion_curso = input('Descripción del curso: ')

    conn = psycopg2.connect(
        host='localhost',
        user='postgres',
        password='1234',
        database='escuela64',
        port='5432'
    )
    cursor = conn.cursor()

    crear_tablas(cursor)
    conn.commit()

    cursor.execute(
        "INSERT INTO estudiante (id, nombre, edad, email) VALUES (%s, %s, %s, %s) ON CONFLICT (id) DO NOTHING",
        (id, nombre, edad, email)
    )

    cursor.execute(
        "INSERT INTO curso (nombre, descripcion) VALUES (%s, %s) RETURNING id_curso",
        (nombre_curso, descripcion_curso)
    )
    curso_id = cursor.fetchone()[0]

    cursor.execute(
        "INSERT INTO inscripcion (id_estudiante, id_curso) VALUES (%s, %s)",
        (id, curso_id)
    )

    conn.commit()
    cursor.close()
    conn.close()

    print("¡Estudiante, curso e inscripción registrados correctamente!")

if __name__ == "__main__":
    main()
