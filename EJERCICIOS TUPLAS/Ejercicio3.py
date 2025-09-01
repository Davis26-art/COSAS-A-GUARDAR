Personas = (('David', 17), ('Kevin', 19), ('Monica', 16), ('Steban', 26))

for x in Personas:
    if x[1] > 18:
        print(f'{x} es mayor de edad. ')


Tupla = ('David', 19, 'Colombia')
nombre, edad, nacionalidad = Tupla
print(nombre)
print(edad)
print(nacionalidad)

Tupla2 = ((1, 2), (3, 4), (5, 6))
print(Tupla2[0][1])

